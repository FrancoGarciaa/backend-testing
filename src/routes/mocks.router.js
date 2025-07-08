import { Router } from "express";
import { MocksController } from "../controllers/mocks.controller.js";
import UserModel from "../persistence/models/user.model.js";

const router = Router();
const controller = new MocksController();

/**
 * @swagger
 * /api/mocks/mockingusers:
 *   get:
 *     summary: Obtener 50 usuarios simulados (mocking users).
 *     tags:
 *       - Mocks
 *     responses:
 *       200:
 *         description: Lista de usuarios simulados generados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   first_name:
 *                     type: string
 *                   last_name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *                   role:
 *                     type: string
 *                   pets:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.get("/mockingusers", (req, res, next) => controller.getMockingUsers(req, res, next));

/**
 * @swagger
 * /api/mocks/generateData:
 *   get:
 *     summary: Generar datos mock de usuarios y mascotas.
 *     tags:
 *       - Mocks
 *     parameters:
 *       - in: query
 *         name: users
 *         schema:
 *           type: integer
 *         description: Cantidad de usuarios a generar.
 *         required: false
 *       - in: query
 *         name: pets
 *         schema:
 *           type: integer
 *         description: Cantidad de mascotas a generar.
 *         required: false
 *     responses:
 *       200:
 *         description: Datos generados exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usersGenerated:
 *                   type: integer
 *                 petsGenerated:
 *                   type: integer
 */
router.get("/generateData", (req, res, next) => controller.generateData(req, res, next));

/**
 * @swagger
 * /api/mocks/mockingpets:
 *   get:
 *     summary: Obtener mascotas simuladas (mocking pets).
 *     tags:
 *       - Mocks
 *     responses:
 *       200:
 *         description: Lista de mascotas simuladas generadas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   type:
 *                     type: string
 *                   age:
 *                     type: integer
 */
router.get("/mockingpets", (req, res, next) => controller.getMockingPets(req, res, next));

/**
 * @swagger
 * /api/mocks/view-mockingusers:
 *   get:
 *     summary: Renderiza la vista con usuarios mock.
 *     tags:
 *       - Mocks
 *     responses:
 *       200:
 *         description: Vista renderizada con usuarios.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       500:
 *         description: Error al cargar la vista.
 */
router.get("/view-mockingusers", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.render("mocks", { users });
    } catch (error) {
        res.status(500).send("Error al cargar la vista");
    }
});

export default router;
