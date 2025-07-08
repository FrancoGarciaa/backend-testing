import * as chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app.js";

const expect = chai.expect;
chai.default.use(chaiHttp); 


describe("POST /api/sessions/register", () => {
it("debería registrar un usuario correctamente", async () => {
    const userData = {
    first_name: "Test",
    last_name: "User",
    email: `testuser${Date.now()}@example.com`,
    age: 30,
    password: "test1234"
    };

    const res = await chai.request(app)
    .post("/api/sessions/register")
    .send(userData);

    console.log("Response body:", res.body);

    expect(res).to.have.status(201);
    expect(res.body).to.have.property("status", "success");
    expect(res.body).to.have.property("message").that.includes("registrado correctamente");
});
});
