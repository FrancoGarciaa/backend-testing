import request from "supertest";
import app from "../../src/app.js";
import assert from "assert";
import { describe, it } from "mocha";

const testUser = {
    first_name: "Test",
    last_name: "User",
    email: `testuser${Date.now()}@example.com`,
    age: 30,
    password: "test1234"
};

describe("POST /api/sessions/register + /api/sessions/login", () => {
    it("debería registrar y luego loguear un usuario correctamente", async () => {

        const registerRes = await request(app)
            .post("/api/sessions/register")
            .send(testUser);
        
        console.log("Register response:", registerRes.body);
        assert.strictEqual(registerRes.status, 201);
        assert.strictEqual(registerRes.body.status, "success");

        const loginRes = await request(app)
            .post("/api/sessions/login")
            .send({
                email: testUser.email,
                password: testUser.password
            });
        
        console.log("Login response:", loginRes.body);
        assert.strictEqual(loginRes.status, 200);
        assert.strictEqual(loginRes.body.status, "success");
        assert.ok(loginRes.body.token, "Debe devolver un token");
    });
});

describe("POST /api/sessions/register", () => {
    it("debería registrar un usuario correctamente", async () => {
        const userData = {
            first_name: "Test",
            last_name: "User",
            email: `testuser${Date.now()}@example.com`,
            age: 30,
            password: "test1234"
        };

        const res = await request(app)
            .post("/api/sessions/register")
            .send(userData);

        console.log("Response body:", res.body);

        assert.strictEqual(res.status, 201);
        assert.strictEqual(res.body.status, "success");
        assert.strictEqual(res.body.message, "Usuario registrado correctamente");
    });
});
