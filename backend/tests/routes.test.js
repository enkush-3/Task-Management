import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import express from "express";
import taskRouter from "../modules/task/routes.js";
import authRouter from "../modules/auth/routes.js";
import { User } from "../modules/auth/model.js";

let server;
let baseURL;

before(async () => {
    const app = express();
    app.use(express.json());
    app.use("/api/auth", authRouter);
    app.use("/api/task", taskRouter);
    app.use((_error, _req, res, _next) => res.status(500).json({ message: "Unexpected error" }));
    server = app.listen(0, "127.0.0.1");
    await new Promise((resolve) => server.once("listening", resolve));
    baseURL = `http://127.0.0.1:${server.address().port}`;
});

after(() => new Promise((resolve) => server.close(resolve)));

test("GET cannot reach task mutation handlers", async () => {
    for (const path of ["create", "update/123", "123"]) {
        const response = await fetch(`${baseURL}/api/task/${path}`);
        assert.equal(response.status, 404, path);
    }
});

test("task mutations still require authentication on their intended methods", async () => {
    for (const [method, path] of [["POST", "create"], ["PATCH", "update/123"], ["DELETE", "123"]]) {
        const response = await fetch(`${baseURL}/api/task/${path}`, { method });
        assert.equal(response.status, 403, `${method} ${path}`);
        assert.equal((await response.json()).message, "No token provided");
    }
});

test("object-valued auth credentials are rejected before database queries", async (t) => {
    const query = t.mock.method(User, "findOne", () => {
        throw new Error("Invalid credentials reached database");
    });
    const cases = [
        ["login", { loginId: { $ne: null }, password: "password" }],
        ["login", { loginId: "user", password: { $ne: null } }],
        ["register", { fullname: "User", username: { $ne: null }, email: "user@example.com", password: "password" }],
        ["register", { fullname: "User", username: "user", email: "user@example.com", password: { $ne: null } }],
    ];
    for (const [path, body] of cases) {
        const response = await fetch(`${baseURL}/api/auth/${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        assert.equal(response.status, 400, path);
    }
    assert.equal(query.mock.callCount(), 0);
});
