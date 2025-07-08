import { getAllUsers, createUser } from "../services/users.service.js";

export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({ status: "success", payload: users });
    } catch (error) {
        req.logger?.error(error);
        res.status(500).json({ status: "error", error: error.message });
    }
};

export const createUsers = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await createUser(userData);
        res.status(201).json({ status: "success", payload: newUser });
    } catch (error) {
        req.logger?.error(error);
        res.status(500).json({ status: "error", error: error.message });
    }
};