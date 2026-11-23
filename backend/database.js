import mongoose from "mongoose";

let connectionPromise;

mongoose.connection.on("disconnected", () => {
    connectionPromise = undefined;
});

export async function connectDatabase() {
    if (mongoose.connection.readyState === 1) return mongoose;

    if (!connectionPromise) {
        const uri = process.env.MONGODB_URI || (
            process.env.NODE_ENV !== "production" ? "mongodb://localhost:27017/taskdb" : undefined
        );
        if (!uri) throw new Error("MONGODB_URI is required");

        connectionPromise = mongoose.connect(uri, {
            maxPoolSize: 5,
            serverSelectionTimeoutMS: 5000,
        }).catch((error) => {
            connectionPromise = undefined;
            throw error;
        });
    }

    return connectionPromise;
}
