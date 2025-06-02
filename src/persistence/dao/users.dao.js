import UserModel from '../models/user.model.js';

export class UsersDao {
async getAll() {
    return await UserModel.find().lean();
}

async create(userData) {
    return await UserModel.create(userData);
}
}