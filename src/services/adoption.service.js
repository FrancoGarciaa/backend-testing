import { adoptionRepository } from "../repository/adoption.repository.js";

export class AdoptionService {
    async createAdoption(data) {
        return await adoptionRepository.create(data);
    }

    async listAdoptions() {
        return await adoptionRepository.getAll();
    }
}
