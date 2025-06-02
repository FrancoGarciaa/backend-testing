import { petRepository } from '../repository/pets.repository.js';

export const getAllPets = async () => {
return await petRepository.getAll();
};