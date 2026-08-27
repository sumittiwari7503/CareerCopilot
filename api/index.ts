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
  const { execSync } = await import("child_process");
  const fs = await import("fs");
  const path = await import("path");

  try {
    const cwd = process.cwd();
    const migrationsExist = fs.existsSync(path.join(cwd, "prisma/migrations"));
    const schemaExists = fs.existsSync(path.join(cwd, "prisma/schema.prisma"));

    let stdout = "";
    if (schemaExists) {
      stdout = execSync("npx prisma migrate deploy", {
        cwd,
        env: { ...process.env, PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK: "1" }
      }).toString();
    } else {
      throw new Error(`schema.prisma not found at ${path.join(cwd, "prisma/schema.prisma")}`);
    }

    return res.json({
      success: true,
      cwd,
      migrationsExist,
      schemaExists,
      stdout
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.message,
      stderr: err.stderr ? err.stderr.toString() : null,
      stdout: err.stdout ? err.stdout.toString() : null
    });
  }
});

export default app;
