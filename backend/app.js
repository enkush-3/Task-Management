import express from "express";
import mongoose from "mongoose";
import router from "./routers.js";
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import cors from "cors"
import http from "http"

import { Server } from "socket.io";
import { socketAuth } from "./middleware/Authorization.js";

dotenv.config();
const app = express();

const server = http.createServer(app);

const allowedOrigins = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',')
    : ['http://localhost:5173', 'http://localhost:8080'];

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST", "DELETE", "PATCH"],
        credentials: true
    }
});

const PORT = 3000;

app.set("io", io); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: allowedOrigins, credentials: true }));

io.use(socketAuth);


async function connectDB() {
    try {
        const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/taskdb";
        await mongoose.connect(mongoUri);
        console.log("✅ Mongodb connected");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
}

async function startServer() {
    await connectDB();
    app.use("/api", router);
    server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

startServer();
