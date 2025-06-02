export class PetDTO {
constructor(pet) {
    this.name = pet.name;
    this.species = pet.species;
    this.owner = pet.owner || null;
}
}