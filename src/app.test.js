import express from "express";
import sessionsRouter from "./routes/sessions.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionRouter from "./routes/adoption.router.js";
import usersRouter from "./routes/users.router.js";

const app = express();

app.use(express.json());

app.use("/api/sessions", sessionsRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionRouter);
app.use("/api/users", usersRouter);

export default app;