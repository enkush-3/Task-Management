import express from "express";
import router from "./routers.js";
import cors from "cors";
import { connectDatabase } from "./database.js";

const app = express();
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173,http://localhost:8080")
    .split(",").map((origin) => origin.trim()).filter(Boolean);

app.disable("x-powered-by");
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: false, limit: "100kb" }));
app.use("/api", (_req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});

app.use("/api", async (_req, res, next) => {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
        return res.status(503).json({ success: false, message: "Service is not configured" });
    }

    try {
        await connectDatabase();
        next();
    } catch {
        res.status(503).json({ success: false, message: "Database is temporarily unavailable" });
    }
});

app.get("/api/health", (_req, res) => {
    res.json({ success: true, status: "ok", database: "connected" });
});
app.use("/api", router);
app.use((_req, res) => {
    res.status(404).json({ success: false, message: "API route not found" });
});
app.use((error, _req, res, _next) => {
    const status = error.status === 413 ? 413
        : error.type === "entity.parse.failed" || error.name === "ValidationError" || error.name === "CastError" ? 400
        : error.code === 11000 ? 409 : 500;
    const message = status === 413 ? "Request body is too large"
        : status === 400 ? "Invalid request"
        : status === 409 ? "Username or email is already used" : "Server error";
    res.status(status).json({ success: false, message });
});

export default app;
