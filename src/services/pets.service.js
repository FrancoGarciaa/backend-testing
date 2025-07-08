import { PetsDao } from "../persistence/dao/pets.dao.js";

const petsDao = new PetsDao();

export const getAllPets = async () => {
return await petsDao.getAll();
};

export const createPetService = async (petData) => {
return await petsDao.create(petData);
};

export const getPetById = async (id) => {
    return await petsDao.getById(id);
};
