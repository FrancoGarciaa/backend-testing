import { MocksService } from "../services/mocks.service.js";

const mocksService = new MocksService();

export class MocksController {
async getMockingUsers(req, res, next) {
    try {
    const users = await mocksService.generateMockUsers(50);
    res.status(200).json({ status: "success", payload: users });
    } catch (error) {
    req.logger?.error(error);
    next(error);
    }
}

async getMockingPets(req, res, next) {
    try {
        const pets = generateMultiplePets(50);
        res.send({ status: "success", pets });
    } catch (err) {
        next(err);
    }
}

async generateData(req, res, next) {
    try {
        const usersCount = parseInt(req.query.users) || 0;
        const petsCount = parseInt(req.query.pets) || 0;

        if (isNaN(usersCount) || usersCount < 0 || isNaN(petsCount) || petsCount < 0) {
            return res.status(400).json({ status: "error", message: "Invalid parameters" });
        }

        const result = await mocksService.generateData(usersCount, petsCount);

        res.status(201).json({
            status: "success",
            usersInserted: result.users.length,
            petsInserted: result.pets.length
        });
    } catch (error) {
        req.logger?.error(error);
        next(error);
    }
}
}