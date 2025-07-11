import { usersDao } from "../persistence/factories/users.factory.js";
import { UserDTO } from "../persistence/dto/user.dto.js";

class UsersRepository {
async getAll() {
    const users = await usersDao.getAll();
    return users.map(u => new UserDTO(u));
}

async create(userData) {
    const dto = new UserDTO(userData);
    return await usersDao.create(dto);
}

async getById(id) {
    const user = await usersDao.getById(id);
    return new UserDTO(user);
}

}

export const userRepository = new UsersRepository();