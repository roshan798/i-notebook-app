"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDTO {
    constructor(user) {
        this.id = user._id.toString();
        this.name = user.name;
        this.email = user.email;
        this.createdAt = user.createdAt;
    }
}
exports.default = UserDTO;
