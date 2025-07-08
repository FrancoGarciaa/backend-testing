export class PetDTO {
constructor(pet) {
    this.id = pet._id;
    this.name = pet.name;
    this.species = pet.species;
    this.owner = pet.owner || null;
}
}