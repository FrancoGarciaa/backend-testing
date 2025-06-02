import { Router } from "express";
import { getUsers, createUsers } from "../controllers/users.controller.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";

const router = Router();

router.get("/", getUsers);

router.post("/", validateBody, createUsers);


export default router;