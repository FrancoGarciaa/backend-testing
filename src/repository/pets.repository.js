import { petsDao } from "../persistence/factories/pets.factory.js";
import { PetDTO } from "../persistence/dto/pet.dto.js";

class PetsRepository {
async getAll() {
    const pets = await petsDao.getAll();
    return pets.map(p => new PetDTO(p));
}

async create(petData) {
    const dto = new PetDTO(petData);
    return await petsDao.create(dto);
}

async getById(id) {
    return await petsDao.getById(id);
}

}

export const petRepository = new PetsRepository();