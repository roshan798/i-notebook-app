import type { Notes } from "notes";
class NotesDTO {
    id: string;
    title: string;
    content: string;
    tags: string[];

    constructor(notes: Notes) {
        this.id = notes._id!.toString();
        this.title = notes.title;
        this.content = notes.content;
        this.tags = notes.tags;
    }
}
export default NotesDTO;