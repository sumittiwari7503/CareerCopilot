import { PrismaClient } from "../prisma/client/index.js";
import serverApp from "./server.cjs";

const prisma = new PrismaClient();
const app = (serverApp as any).default || serverApp;

app.get("/api/health-diagnostics", async (req, res) => {
  const envStatus = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    SUPABASE_JWT_SECRET: !!process.env.SUPABASE_JWT_SECRET,
    GEMINI_API_KEY: !!process.env.GEMINI_API_KEY,
    VITE_SUPABASE_URL: !!process.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: !!process.env.VITE_SUPABASE_ANON_KEY
  };

  let dbConnection = "Checking...";
  let dbError = null;
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbConnection = "SUCCESS";
  } catch (err: any) {
    dbConnection = "FAILED";
    dbError = err.message;
  }

  return res.json({
    status: "OK",
    envStatus,
    dbConnection,
    dbError,
    platform: process.platform,
    nodeVersion: process.version
  });
});

app.get("/api/run-migrations", async (req, res) => {
  const fs = await import("fs");
  const path = await import("path");
  const crypto = await import("crypto");

  const applied: string[] = [];
  const logs: string[] = [];

  try {
    const cwd = process.cwd();
    const migrationsDir = path.join(cwd, "prisma/migrations");

    if (!fs.existsSync(migrationsDir)) {
      throw new Error(`Migrations directory not found at ${migrationsDir}`);
    }

    // 1. Create _prisma_migrations table if not exists
    logs.push("Initializing _prisma_migrations registry table...");
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
        "id" VARCHAR(36) NOT NULL PRIMARY KEY,
        "checksum" VARCHAR(64) NOT NULL,
        "finished_at" TIMESTAMPTZ,
        "migration_name" VARCHAR(255) NOT NULL,
        "logs" TEXT,
        "rolled_back_at" TIMESTAMPTZ,
        "started_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "applied_steps_count" INTEGER NOT NULL DEFAULT 0
      );
    `);

    // 2. Scan migration folders
    const items = fs.readdirSync(migrationsDir);
    const migrationFolders = items
      .filter(item => {
        const stats = fs.statSync(path.join(migrationsDir, item));
        return stats.isDirectory() && /^\d{14}_/.test(item);
      })
      .sort(); // Sort chronologically

    logs.push(`Found ${migrationFolders.length} migrations in directory: ${JSON.stringify(migrationFolders)}`);

    for (const folderName of migrationFolders) {
      // Check if migration has already been applied
      const existing: any[] = await prisma.$queryRawUnsafe(
        `SELECT migration_name FROM "_prisma_migrations" WHERE finished_at IS NOT NULL AND migration_name = $1`,
        folderName
      );

      if (existing.length > 0) {
        logs.push(`Migration ${folderName} is already applied.`);
        continue;
      }

      logs.push(`Applying migration ${folderName}...`);
      const sqlPath = path.join(migrationsDir, folderName, "migration.sql");
      if (!fs.existsSync(sqlPath)) {
        throw new Error(`migration.sql not found at ${sqlPath}`);
      }

      const sql = fs.readFileSync(sqlPath, "utf-8");
      const checksum = crypto.createHash("sha256").update(sql).digest("hex");
      const migrationId = crypto.randomUUID();

      // Start transaction or raw execution block
      await prisma.$executeRawUnsafe(sql);

      // Register migration in logs
      await prisma.$executeRawUnsafe(
        `INSERT INTO "_prisma_migrations" (id, checksum, finished_at, migration_name, started_at, applied_steps_count)
         VALUES ($1, $2, NOW(), $3, NOW(), 1)`,
        migrationId,
        checksum,
        folderName
      );

      applied.push(folderName);
      logs.push(`Successfully applied and registered migration ${folderName}`);
    }

    return res.json({
      success: true,
      logs,
      applied
    });
  } catch (err: any) {
    console.error("Migration runner failed:", err);
    return res.status(500).json({
      success: false,
      error: err.message,
      logs,
      applied,
      stack: err.stack
    });
  }
});

export default app;
