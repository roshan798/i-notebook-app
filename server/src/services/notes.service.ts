import { SortOrder } from 'mongoose';
import NotesModel from '../schema/models/notes';
import type { UserId } from '../schema/types/user';
import { Notes, NotesId, NotesRequestBody, GetNotesParams, ChecklistItem } from '../schema/types/notes';

class NotesService {
    async create(notes: NotesRequestBody): Promise<Notes> {
        try {
            const savedNote = new NotesModel(notes);
            await savedNote.save();
            return savedNote;
        } catch (error) {
            throw error;
        }
    }

    async getNotesByUserId(userId: UserId, params: GetNotesParams): Promise<Notes[]> {
        const { orderBy = "desc", sortBy = "createdAt", limit, page } = params;
        const sortOrder: SortOrder = orderBy === "desc" ? -1 : 1;

        // Define sort criteria with correct SortOrder types
        const sortCriteria: { [key: string]: SortOrder } = {
            pinned: -1 as SortOrder,
            pinnedAt: -1 as SortOrder,
            updatedAt: sortOrder,
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
            const note = await NotesModel.findById(noteId);
            return note;
        } catch (error) {
            throw error;
        }
    }

    async deleteNoteById(noteId: NotesId): Promise<Notes | null> {
        try {
            const note = await NotesModel.findByIdAndDelete(noteId);
            return note;
        } catch (error) {
            throw error;
        }
    }

    async updateNoteById(noteId: NotesId, notes: NotesRequestBody): Promise<Notes | null> {
        try {
            const updatedNote = await NotesModel.findByIdAndUpdate(noteId, notes, { new: true });
            return updatedNote;
        } catch (error) {
            throw error;
        }
    }

    async pinNoteById(noteId: string, pin: boolean): Promise<Notes | null> {
        try {
            const updateFields: Partial<Notes> = {
                pinned: pin
            };

            if (pin) {
                updateFields.pinnedAt = new Date(); // Set `pinnedAt` to current date if pin is true
            } else {
                updateFields.pinnedAt = undefined; // Optionally clear `pinnedAt` if pin is false
            }

            const note = await NotesModel.findByIdAndUpdate(
                noteId,
                { ...updateFields, updatedAt: new Date() },
                { new: true }
            ).exec();

            return note;
        } catch (error) {
            console.error('Error pinning note:', error);
            throw error;
        }
    }

    // Global update function
    async updateFields(noteId: NotesId, updates: Partial<NotesRequestBody>): Promise<Notes | null> {
        try {
            const updatedNote = await NotesModel.findByIdAndUpdate(
                noteId,
                { ...updates, updatedAt: new Date() },
                { new: true }
            ).exec();

            return updatedNote;
        } catch (error) {
            console.error('Error updating note:', error);
            throw error;
        }
    }
    async updateCheckList(noteId: string, checklistItem: ChecklistItem): Promise<Notes | null> {
    try {
        const { id, completed } = checklistItem;

        // Perform the update operation
        const result = await NotesModel.findOneAndUpdate(
            { _id: noteId, 'checklist._id': id },
            { $set: { 'checklist.$.completed': completed } },
            { new: true, useFindAndModify: false } // Return the updated document
        );

        if (!result) {
            throw new Error('Note or checklist item not found');
        }

        return result;
    } catch (error) {
        console.error('Error updating checklist item:', error);
        throw error; // Re-throw the error to handle it in the controller
    }
}
    
}

export default new NotesService();
