import { Router } from "express";
import { MocksController } from "../controllers/mocks.controller.js";
import UserModel from "../persistence/models/user.model.js";

const router = Router();
const controller = new MocksController();

router.get("/mockingusers", (req, res, next) => controller.getMockingUsers(req, res, next));
router.post("/generateData", (req, res, next) => controller.generateData(req, res, next));

router.get('/view-mockingusers', async (req, res) => {
try {
    const users = await UserModel.find();
    res.render('mocks', { users });
} catch (error) {
    res.status(500).send('Error al cargar la vista');
}
});

export default router;