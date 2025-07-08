import { userRepository } from "../repository/users.repository.js";

export const getAllUsers = async () => {
    return await userRepository.getAll();
};

export const createUser = async (userData) => {
    return await userRepository.create(userData);
};

export const getUserById = async (id) => {
    return await userRepository.getById(id);
};
