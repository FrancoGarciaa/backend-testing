import bcrypt from "bcrypt";
import UserModel from "../persistence/models/user.model.js";
import { generateToken } from "../utils/jwt.util.js";

export const registerUser = async (req, res, next) => {
    console.log("Body recibido:", req.body);
    try {
        const { first_name, last_name, email, age, password } = req.body;

        const existUser = await UserModel.findOne({ email });
        if (existUser) {
            return res.status(400).json({ status: "error", message: "El usuario ya existe" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new UserModel({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            role: "user",
            pets: []
        });

        await newUser.save();

        res.status(201).json({ status: "success", message: "Usuario registrado correctamente" });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(401).json({ status: "error", message: "Usuario no encontrado" });

        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) return res.status(401).json({ status: "error", message: "Contraseña incorrecta" });

        const token = generateToken(user);

        res.status(200).json({ status: "success", message: "Login correcto", token });
    } catch (error) {
        next(error);
    }
};
