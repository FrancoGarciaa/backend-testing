import request from "supertest";
import app from "../app.test.js";
import mongoose from "mongoose";
import assert from "assert";

before(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb");
});

after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
});

describe("GET /api/users", () => {

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