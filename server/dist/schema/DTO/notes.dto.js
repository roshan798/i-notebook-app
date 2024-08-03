"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotesDTO {
    constructor(notes) {
        this.title = "";
        this.content = "";
        this.checklist = [];
        this.id = notes._id.toString();
        this.tags = notes.tags;
        this.pinned = notes.pinned;
        this.createdAt = notes.createdAt;
        this.updatedAt = notes.updatedAt;
        this.type = notes.type;
        this.color = notes.color;
        if (notes.title !== undefined)
            this.title = notes.title;
        if (notes.content !== undefined)
            this.content = notes.content;
        if (notes.pinnedAt)
            this.pinnedAt = notes.pinnedAt;
        if (notes.checklist)
            this.checklist = notes.checklist;
    }
}
exports.default = NotesDTO;
