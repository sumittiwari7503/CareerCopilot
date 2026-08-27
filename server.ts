import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Import Routers
import profileRouter from "./src/server/routes/profile";
import applicationRouter from "./src/server/routes/application";
import aiRouter from "./src/server/routes/ai";
import actionsRouter from "./src/server/routes/actions";
import projectsRouter from "./src/server/routes/projects";
import authRouter from "./src/server/routes/auth";
import careerPlanRouter from "./src/server/routes/careerPlan";

import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

// Dev CORS configurations
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const isAllowed = allowedOrigins.includes(origin) || 
                      /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(origin) ||
                      /^http:\/\/172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(origin) ||
                      /^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(origin);
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Mount API Routers
app.use("/api/auth", authRouter);
app.use("/api", profileRouter);
app.use("/api", applicationRouter);
app.use("/api", aiRouter);
app.use("/api/actions", actionsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/career-plan", careerPlanRouter);
app.use("/api/roadmap", careerPlanRouter);

// Setup Vite or Production Static Assets Handler
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server fully operational on http://localhost:${PORT}`);
    });
  }
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
