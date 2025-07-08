import request from "supertest";
import { describe, it } from "mocha";
import app from "../app.js";
import assert from "assert";

describe("GET /api/mocks/mockingusers", () => {

            this.timeout(5000);

    it("should return 200", async () => {
        const res = await request(app).get("/api/mocks/mockingusers");
        assert.strictEqual(res.status, 200);
    });
});

describe("GET /api/mocks/generateData", () => {

    it("debería generar datos de prueba", async () => {
        const res = await request(app)
            .get("/api/mocks/generateData")
            .query({ users: 50, pets: 50 });

        if (res.status !== 201) {
            console.error("Response body:", res.body);
        }

        assert.strictEqual(res.status, 201);
        assert.strictEqual(res.body.status, "success");
        assert.strictEqual(typeof res.body.usersInserted, "number");
        assert.strictEqual(typeof res.body.petsInserted, "number");
    });
});