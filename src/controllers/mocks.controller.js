import { MocksService } from '../services/mocks.service.js';

const mocksService = new MocksService();

export class MocksController {
async getMockingUsers(req, res, next) {
    try {
    const users = await mocksService.generateMockUsers(50);
    res.status(200).json({ status: 'success', payload: users });
    } catch (error) {
    req.logger?.error(error);
    next(error);
    }
}

async generateData(req, res, next) {
    try {
    const { users = 0, pets = 0 } = req.body;

    const usersCount = Number(users);
    const petsCount = Number(pets);
    if (isNaN(usersCount) || usersCount < 0 || isNaN(petsCount) || petsCount < 0) {
        return res.status(400).json({ status: 'error', message: 'Invalid parameters' });
    }

    const result = await mocksService.generateData(usersCount, petsCount);

    res.status(201).json({
        status: 'success',
        usersInserted: result.users.length,
        petsInserted: result.pets.length
    });
    } catch (error) {
    req.logger?.error(error);
    next(error);
    }
}
}