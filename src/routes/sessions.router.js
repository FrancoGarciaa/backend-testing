import { Router } from "express";
import { registerUser, loginUser } from "../controllers/sessions.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Sessions
 *     description: Endpoints de autenticación
 */

/**
 * @swagger
 * /api/sessions/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags:
 *       - Sessions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/sessions/login:
 *   post:
 *     summary: Login de usuario
 *     tags:
 *       - Sessions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login correcto, devuelve token JWT
 */
router.post("/login", loginUser);

export default router;
