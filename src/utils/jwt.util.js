import jwt from "jsonwebtoken";
import { config } from "../config/env.config.js";

export const generateToken = (user) => {
    return jwt.sign({ user }, config.jwt_secret || "secretJWT", {
        expiresIn: "1h",
    });
};