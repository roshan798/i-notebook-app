import { Notes, NotesId, NotesRequestBody } from "notes";
import NotesModel from "@models/notes.model";
import { UserId } from "user";
class NotesService {

    async create(notes: NotesRequestBody): Promise<Notes> {
        try {
            const savedNote = new NotesModel(notes);
            await savedNote.save();
            return savedNote;
        }
        catch (error) {
            throw error;
        }
    }

    async getNotesByUserId(userId: UserId): Promise<Notes[]> {
        try {
            const notes = await NotesModel.find({ userId });
            return notes;
        }
        catch (error) {
            throw error;
        }
    }

    async getNoteById(noteId: NotesId): Promise<Notes | null> { // null in case there is no note  mathing to id
        try {
            const note = await NotesModel.findById(noteId);
            return note;
        }
        catch (error) {
            throw error;
        }
    }
}
export default new NotesService;