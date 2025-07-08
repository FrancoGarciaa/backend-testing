import { Router } from "express";
import { AdoptionController } from "../controllers/adoption.controller.js";
import authMiddleware from "../middlewares/auth.js";

const router = Router();
const controller = new AdoptionController();

/**
 * @swagger
 * tags:
 *   name: Adoptions
 *   description: Endpoints para gestionar adopciones
 */

/**
 * @swagger
 * /api/adoptions:
 *   post:
 *     summary: Registrar una adopción
 *     tags: [Adoptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - petId
 *             properties:
 *               petId:
 *                 type: string
 *                 description: ID de la mascota a adoptar
 *     responses:
 *       201:
 *         description: Adopción registrada correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post("/", authMiddleware, (req, res) => controller.createAdoption(req, res));

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtener todas las adopciones
 *     tags: [Adoptions]
 *     responses:
 *       200:
 *         description: Lista de adopciones
 */
router.get("/", (req, res) => controller.listAdoptions(req, res));

export default router;
