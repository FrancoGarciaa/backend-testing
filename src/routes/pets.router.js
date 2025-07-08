import { Router } from "express";
import { getPets, createPet } from "../controllers/pets.controller.js";

const router = Router();

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Obtener la lista de mascotas.
 *     tags:
 *       - Pets
 *     responses:
 *       200:
 *         description: Lista de mascotas.
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
router.get("/", getPets);

/**
 * @swagger
 * /api/pets:
 *   post:
 *     summary: Crear una nueva mascota.
 *     tags:
 *       - Pets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               age:
 *                 type: integer
 *             required:
 *               - name
 *               - type
 *               - age
 *     responses:
 *       201:
 *         description: Mascota creada exitosamente.
 */
router.post("/", createPet);

export default router;
