import { PrismaClient } from "../prisma/client/index.js";
import serverApp from "./server.cjs";
import { exec } from "child_process";

// Execute database migrations programmatically on serverless cold starts
exec("npx prisma migrate deploy", (err, stdout, stderr) => {
  if (err) {
    console.error("Serverless database migration failed:", err);
  } else {
    console.log("Serverless database migration output:", stdout);
  }
});

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

export default app;
