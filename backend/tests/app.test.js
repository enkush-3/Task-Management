import assert from "node:assert/strict";
import { after, afterEach, before, beforeEach, test } from "node:test";
import mongoose from "mongoose";
import app from "../app.js";

let server;
let baseURL;
const originalEnvironment = {
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
};

before(async () => {
    server = app.listen(0, "127.0.0.1");
    await new Promise(resolve => server.once("listening", resolve));
    baseURL = `http://127.0.0.1:${server.address().port}`;
});

beforeEach(() => {
    process.env.NODE_ENV = "production";
    process.env.JWT_SECRET = "test-secret-with-at-least-32-characters";
    delete process.env.MONGODB_URI;
    mongoose.connection.readyState = 0;
    mongoose.connection.emit("disconnected");
});

afterEach(() => {
    mongoose.connection.readyState = 0;
    mongoose.connection.emit("disconnected");
    for (const [key, value] of Object.entries(originalEnvironment)) {
        if (value === undefined) delete process.env[key];
        else process.env[key] = value;
    }
});
after(() => new Promise(resolve => server.close(resolve)));

test("an unavailable database produces a sanitized 503 without terminating the server", async () => {
    for (let i = 0; i < 2; i++) {
        const response = await fetch(`${baseURL}/api/health`);
        assert.equal(response.status, 503);
        assert.deepEqual(await response.json(), {
            success: false, message: "Database is temporarily unavailable",
        });
    }
});

test("missing signing configuration fails closed", async () => {
    delete process.env.JWT_SECRET;
    const response = await fetch(`${baseURL}/api/health`);
    assert.equal(response.status, 503);
    assert.equal((await response.json()).message, "Service is not configured");
});

test("healthy requests reuse the connection and unknown API paths return JSON", async (t) => {
    mongoose.connection.readyState = 1;
    const connect = t.mock.method(mongoose, "connect", () => {
        throw new Error("A warm connection should be reused");
    });
    const health = await fetch(`${baseURL}/api/health`);
    assert.equal(health.status, 200);
    assert.equal((await health.json()).database, "connected");
    assert.equal(health.headers.get("cache-control"), "no-store");
    const missing = await fetch(`${baseURL}/api/missing`);
    assert.equal(missing.status, 404);
    assert.equal((await missing.json()).message, "API route not found");
    assert.equal(connect.mock.callCount(), 0);
});

test("malformed JSON gets a safe client error", async () => {
    const response = await fetch(`${baseURL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{invalid",
    });
    assert.equal(response.status, 400);
    assert.equal((await response.json()).message, "Invalid request");
});
