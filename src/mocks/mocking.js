import { faker } from "@faker-js/faker";
import { createHash } from "../utils/hash.util.js";

export const generateMockUser = () => ({
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: createHash("coder123"),
    role: faker.helpers.arrayElement(["user", "admin"]),
    pets: [],
});


export const generateMockPet = (owners = []) => ({
    name: faker.animal.name(),
    species: faker.animal.type(),
    age: faker.number.int({ min: 1, max: 15 }),
    adopted: faker.datatype.boolean(),
    owner: owners.length && faker.datatype.boolean()
    ? faker.helpers.arrayElement(owners)
    : null,
});


export const generateMultipleUsers = (count = 50) =>
    Array.from({ length: count }, () => generateMockUser());


export const generateMultiplePets = (count = 50, ownerIds = []) =>
    Array.from({ length: count }, () => generateMockPet(ownerIds));