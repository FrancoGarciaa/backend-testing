import { userRepository } from '../repository/users.repository.js';
import { petRepository } from '../repository/pets.repository.js';
import { generateMultipleUsers, generateMultiplePets, } from '../mocks/mocking.js'; 

export class MocksService {
async generateMockUsers(count = 50) {
    const users = generateMultipleUsers(count);
    const createdUsers = [];

    for (const user of users) {
    const created = await userRepository.create(user);
    createdUsers.push(created);
    }

    return createdUsers;
}

async generateMockPets(count = 50, ownerIds = []) {
    const pets = generateMultiplePets(count, ownerIds);
    const createdPets = [];

    for (const pet of pets) {
    const created = await petRepository.create(pet);
    createdPets.push(created);
    }

    return createdPets;
}

async generateData(usersCount = 50, petsCount = 50) {
    const users = await this.generateMockUsers(usersCount);
    const ownerIds = users.map(u => u._id);
    const pets = await this.generateMockPets(petsCount, ownerIds);

    return { users, pets };
}
}