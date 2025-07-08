import PetModel from "../models/pets.model.js";

export class PetsDao {
async getAll() {
    return await PetModel.find().lean();
}

async create(petData) {
    return await PetModel.create(petData);
}

async getById(id) {
    return await PetModel.findById(id).lean();
}
}
