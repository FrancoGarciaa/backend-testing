export class UserDTO {
constructor(user) {
    this.id = user._id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role || "user";
    this.pets = user.pets || [];
}
}