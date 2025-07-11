import { getAllPets, createPetService } from "../services/pets.service.js";

export const getPets = async (req, res) => {
try {
    const pets = await getAllPets();
    res.status(200).json({ status: "success", payload: pets });
} catch (error) {
    req.logger?.error(error);
    res.status(500).json({ status: "error", error: error.message });
}
};

export const createPet = async (req, res) => {
try {
    const petData = req.body;
    const newPet = await createPetService(petData);
    res.status(201).json({ status: "success", payload: newPet });
} catch (error) {
    req.logger?.error(error);
    res.status(500).json({ status: "error", error: error.message });
}
};