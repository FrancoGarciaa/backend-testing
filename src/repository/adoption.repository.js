import AdoptionModel from "../persistence/models/adoption.model.js";

export class AdoptionRepository {
async create(adoptionData) {
    return await AdoptionModel.create(adoptionData);
}

async getAll() {
    return await AdoptionModel.find().populate("userId").populate("petId");
}

async getById(id) {
    return await AdoptionModel.findById(id).populate("userId").populate("petId");
}
}

export const adoptionRepository = new AdoptionRepository();
