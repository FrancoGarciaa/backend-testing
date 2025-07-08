import express from "express";
import sessionsRouter from "../src/routes/sessions.router.js";
import petsRouter from "../src/routes/pets.router.js";
import adoptionRouter from "../src/routes/adoption.router.js";

const app = express();

app.use(express.json());

app.use("/api/sessions", sessionsRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionRouter);

export default app;