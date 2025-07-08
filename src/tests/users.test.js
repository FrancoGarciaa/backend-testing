import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import assert from "assert";
import { describe, it } from "mocha";

describe("GET /api/users", () => {

    after(async () => {
        await mongoose.connection.close();
    });

    it("debería responder con una lista de usuarios", async () => {
        const response = await request(app).get("/api/users");

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.status, "success");
        assert.ok(Array.isArray(response.body.payload));
    });
});

describe("Users Service", () => {
    it("should return true for a dummy test", () => {
        assert.strictEqual(true, true);
    });
});