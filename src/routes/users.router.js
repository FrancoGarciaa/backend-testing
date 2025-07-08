import { Router } from "express";
import { getUsers, createUsers } from "../controllers/users.controller.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import passport from "passport";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Endpoints para gestionar usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 payload:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get("/", getUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags:
 *       - Users
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
 *               role:
 *                 type: string
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *               - role
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 */
router.post("/", validateBody(["first_name", "last_name", "email", "password", "role"]), createUsers);

/**
 * @swagger
 * /api/users/current:
 *   get:
 *     summary: Obtener el usuario actual autenticado
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: No autorizado
 */
router.get(
"/current",
passport.authenticate("jwt", { session: false }),
(req, res) => {
    res.json({
    status: "success",
    user: {
        id: req.user._id,
        email: req.user.email,
        role: req.user.role,
    },
    });
}
);

export default router;
