import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import mongoose from "mongoose";
import { connectDatabase } from "../database.js";

const originalEnvironment = { NODE_ENV: process.env.NODE_ENV, MONGODB_URI: process.env.MONGODB_URI };

beforeEach(() => {
    process.env.NODE_ENV = "production";
    process.env.MONGODB_URI = "mongodb://database.invalid/taskdb";
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

test("concurrent cold requests share one MongoDB connection attempt", async (t) => {
    let finish;
    const pending = new Promise(resolve => { finish = resolve; });
    const connect = t.mock.method(mongoose, "connect", () => pending);
    const first = connectDatabase();
    const second = connectDatabase();
    assert.equal(connect.mock.callCount(), 1);
    mongoose.connection.readyState = 1;
    finish(mongoose);
    assert.deepEqual(await Promise.all([first, second]), [mongoose, mongoose]);
    await connectDatabase();
    assert.equal(connect.mock.callCount(), 1);
});

test("a failed connection can be retried by the next request", async (t) => {
    let attempts = 0;
    t.mock.method(mongoose, "connect", async () => {
        if (++attempts === 1) throw new Error("Connection failed");
        mongoose.connection.readyState = 1;
        return mongoose;
    });
    await assert.rejects(connectDatabase(), /Connection failed/);
    assert.equal(await connectDatabase(), mongoose);
    assert.equal(attempts, 2);
});

test("production never falls back to a local database when MONGODB_URI is missing", async (t) => {
    delete process.env.MONGODB_URI;
    const connect = t.mock.method(mongoose, "connect", () => Promise.resolve(mongoose));
    await assert.rejects(connectDatabase(), /MONGODB_URI is required/);
    assert.equal(connect.mock.callCount(), 0);
});
