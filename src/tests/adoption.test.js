import request from "supertest";
import app from "../app.simple.js";
import assert from "assert";
import { describe, it, before } from "mocha";
import mongoose from "mongoose";


before(async () => {
await mongoose.connect("mongodb://localhost:27017/testdb");
});

after(async () => {
await mongoose.connection.dropDatabase();
await mongoose.disconnect();
});


describe("Adoption API", () => {
    let token;
    let petId;
    let testEmail;

    before(async function () {
        this.timeout(20000);

        testEmail = `testadoption${Date.now()}@example.com`;

        console.log("➡️ Registrando usuario de prueba...");
        const registerRes = await request(app)
            .post("/api/sessions/register")
            .send({
                first_name: "Test",
                last_name: "Adoption",
                email: testEmail,
                age: 30,
                password: "test1234"
            });
        assert.strictEqual(registerRes.status, 201);

        const loginRes = await request(app)
            .post("/api/sessions/login")
            .send({
                email: testEmail,
                password: "test1234"
            });
        assert.strictEqual(loginRes.status, 200);
        token = loginRes.body.token;

        const petRes = await request(app)
            .post("/api/pets")
            .send({
                name: "Buddy",
                species: "dog",
                age: 3
            });
        assert.strictEqual(petRes.status, 201);
        petId = petRes.body.payload._id;
    });

    describe("POST /api/adoptions", () => {
        it("debería crear una adopción correctamente", async () => {
            const res = await request(app)
                .post("/api/adoptions")
                .set("Authorization", `Bearer ${token}`)
                .send({ petId });

            assert.strictEqual(res.status, 201);
            assert.strictEqual(res.body.status, "success");
            assert.ok(res.body.adoption.userId);
            assert.strictEqual(res.body.adoption.petId.toString(), petId.toString());
        });

        it("debería fallar sin token", async () => {
            const res = await request(app)
                .post("/api/adoptions")
                .send({ petId });

            assert.strictEqual(res.status, 401);
            assert.strictEqual(res.body.message, "Token inválido o no provisto");
        });

        it("debería fallar con petId inexistente", async () => {
            const fakePetId = new mongoose.Types.ObjectId();
            const res = await request(app)
                .post("/api/adoptions")
                .set("Authorization", `Bearer ${token}`)
                .send({ petId: fakePetId });

            assert.strictEqual(res.status, 404);
            assert.strictEqual(res.body.message, "Mascota no encontrada");
        });

        it("debería fallar sin petId", async () => {
            const res = await request(app)
                .post("/api/adoptions")
                .set("Authorization", `Bearer ${token}`)
                .send({});

            assert.strictEqual(res.status, 400);
            assert.strictEqual(res.body.message, "userId y petId son obligatorios");
        });

        it("debería fallar con formato inválido de petId", async () => {
            const res = await request(app)
                .post("/api/adoptions")
                .set("Authorization", `Bearer ${token}`)
                .send({ petId: "xyz456" });

            assert.strictEqual(res.status, 400);
            assert.strictEqual(res.body.message, "userId o petId inválidos");
        });

        it("debería fallar con token inválido", async () => {
            const res = await request(app)
                .post("/api/adoptions")
                .set("Authorization", `Bearer invalidtoken123`)
                .send({ petId });

            assert.strictEqual(res.status, 401);
            assert.strictEqual(res.body.message, "Token inválido o no provisto");
        });
    });

    describe("GET /api/adoptions", () => {
        it("debería obtener la lista de adopciones", async () => {
            const res = await request(app).get("/api/adoptions");
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.status, "success");
            assert.ok(Array.isArray(res.body.payload));
        });
    });
});
