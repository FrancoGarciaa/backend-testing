import mongoose from "mongoose";
import { connectDB } from "../../src/config/db.js";

describe("MongoDB Connection", () => {
it("should connect without errors", async () => {
    await connectDB();
});
});

before(async function () {
this.timeout(10000);
await mongoose.connect(config.mongo_uri);
console.log("Conectado a MongoDB para tests");
});

after(async () => {
await mongoose.disconnect();
console.log("Desconectado de MongoDB");
});