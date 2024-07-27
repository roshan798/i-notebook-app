"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotesDTO {
    constructor(notes) {
        this.id = notes._id.toString();
        this.title = notes.title;
        this.content = notes.content;
        this.tags = notes.tags;
        this.createdAt = notes.createdAt;
        this.updatedAt = notes.updatedAt;
    }
}
exports.default = NotesDTO;
