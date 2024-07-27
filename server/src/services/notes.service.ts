import { Notes, NotesId, NotesRequestBody, GetNotesParams } from 'notes'
import NotesModel from '../models/notes.model'
import { UserId } from 'user'
import { SortOrder } from 'mongoose'
class NotesService {
    async create(notes: NotesRequestBody): Promise<Notes> {
        try {
            const savedNote = new NotesModel(notes)
            await savedNote.save()
            return savedNote
        } catch (error) {
            throw error
        }
    }

    async getNotesByUserId(userId: UserId, params: GetNotesParams): Promise<Notes[]> {
        const { orderBy = "desc", sortBy = "createdAt", limit, page } = params;
        const sortOrder: SortOrder = orderBy === "desc" ? -1 : 1;
        const sortCriteria = {
            updatedAt: sortOrder,
            // createdAt: sortOrder
        };

        try {
            const notes = await NotesModel.find({ userId })
                .sort(sortCriteria);
            return notes;
        } catch (error) {
            throw error;
        }
    }


    async getNoteById(noteId: NotesId): Promise<Notes | null> {
        try {
            const note = await NotesModel.findById(noteId)
            return note
        } catch (error) {
            throw error
        }
    }
    async deleteNoteById(noteId: NotesId): Promise<Notes | null> {
        try {
            const note = await NotesModel.findByIdAndDelete(noteId)
            return note
        } catch (error) {
            throw error
        }
    }
    async updateNoteById(noteId: NotesId, notes: NotesRequestBody): Promise<Notes | null> {
        try {
            const updatedNote = await NotesModel.findByIdAndUpdate(noteId, notes, { new: true })
            return updatedNote
        } catch (error) {
            throw error
        }
    }
}
export default new NotesService()
