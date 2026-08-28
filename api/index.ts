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
  let migrations: any = null;
  let tables: any = null;
  let columns: any = null;

  try {
    await prisma.$queryRaw`SELECT 1`;
    dbConnection = "SUCCESS";

    migrations = await prisma.$queryRawUnsafe(`
      SELECT id, migration_name, applied_steps_count, finished_at 
      FROM "_prisma_migrations" 
      ORDER BY applied_steps_count ASC;
    `);

    tables = await prisma.$queryRawUnsafe(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `);

    columns = await prisma.$queryRawUnsafe(`
      SELECT table_name, column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      ORDER BY table_name, ordinal_position;
    `);
  } catch (err: any) {
    dbConnection = "FAILED";
    dbError = err.message;
  }

  return res.json({
    status: "OK",
    envStatus,
    dbConnection,
    dbError,
    migrations,
    tables,
    columns,
    platform: process.platform,
    nodeVersion: process.version
  });
});

export default app;
