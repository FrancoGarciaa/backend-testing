import mongoose from "mongoose";
import AdoptionModel from "../persistence/models/adoption.model.js";
import PetModel from "../persistence/models/pets.model.js";
import UserModel from "../persistence/models/user.model.js";

export class AdoptionController {
    async createAdoption(req, res) {
        try {
            const userId = req.user?._id;
            const { petId } = req.body;

            if (!userId || !petId) {
                return res.status(400).json({ status: "error", message: "userId y petId son obligatorios" });
            }

            if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(petId)) {
                return res.status(400).json({ status: "error", message: "userId o petId inválidos" });
            }

            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
            }

            const pet = await PetModel.findById(petId);
            if (!pet) {
                return res.status(404).json({ status: "error", message: "Mascota no encontrada" });
            }

            const adoption = await AdoptionModel.create({ userId, petId });

            return res.status(201).json({ status: "success", adoption });
        } catch (error) {
            console.error("Error en createAdoption:", error);
            return res.status(500).json({ status: "error", message: "Error al crear la adopción" });
        }
    }

    async listAdoptions(req, res) {
        try {
            const adoptions = await AdoptionModel.find().populate("userId").populate("petId");
            return res.status(200).json({ status: "success", payload: adoptions });
        } catch (error) {
            console.error("Error en listAdoptions:", error);
            return res.status(500).json({ status: "error", message: "Error al obtener adopciones" });
        }
    }
}
