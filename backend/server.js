import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import http from "node:http";
import { Server } from "socket.io";
import { connectDatabase } from "./database.js";
import { socketAuth } from "./middleware/Authorization.js";

dotenv.config({ path: fileURLToPath(new URL(".env", import.meta.url)), quiet: true });
const { default: app } = await import("./app.js");
const server = http.createServer(app);
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173,http://localhost:8080")
    .split(",").map((origin) => origin.trim()).filter(Boolean);
const io = new Server(server, {
    cors: { origin: allowedOrigins, credentials: true, methods: ["GET", "POST", "DELETE", "PATCH"] },
});
io.use(socketAuth);
app.set("io", io);

try {
    await connectDatabase();
    const port = Number(process.env.PORT) || 3000;
    server.listen(port, () => console.log(`Server listening on port ${port}`));
} catch {
    console.error("Unable to connect to MongoDB. Check MONGODB_URI and database network access.");
    process.exitCode = 1;
    await io.close();
}
