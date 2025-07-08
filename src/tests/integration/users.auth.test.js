import request from "supertest";
import { expect } from "chai";
import app from "../../src/app.js";
import { describe, it } from "mocha";

describe("GET /api/users/current", () => {
    let token;

    before(async () => {
        const userData = {
            first_name: "Test",
            last_name: "Auth",
            email: `testauth${Date.now()}@example.com`,
            age: 25,
            password: "password123"
        };

        await request(app)
            .post("/api/sessions/register")
            .send(userData);

        const loginResponse = await request(app)
            .post("/api/sessions/login")
            .send({ email: userData.email, password: userData.password });

        token = loginResponse.body.token;
    });

    it("debería devolver el usuario actual con JWT válido", async () => {
        const res = await request(app)
            .get("/api/users/current")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("status", "success");
        expect(res.body.user).to.have.property("email").that.is.a("string");
        expect(res.body.user).to.have.property("role").that.is.a("string");
    });
});
