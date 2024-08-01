import { Request, Response } from 'express'
import { validateNote } from '../utils/validation'
import NotesService from '../services/notes.service'
import { TokenPayload } from '../services/token.service'
import NotesDTO from '../schema/DTO/notes.dto'
import type { NotesRequestBody, GetNotesParams, Notes, UpdateRequestBody } from '../schema/types/notes'

class NotesController {
    async createNote(req: Request, res: Response) {
        const noteData = req.body as NotesRequestBody
        const notesValidationError = validateNote(noteData)
        if (notesValidationError !== null) {
            return res.status(400).json({
                success: false,
                message: notesValidationError,
            })
        }
        if (noteData.pinned === true) {
            noteData.pinnedAt = new Date()
        }
        // remove comment
        // console.log(noteData);
        // return res.json({ message: 'Note created' })
        try {
            const savedNote = await NotesService.create({
                ...noteData,
                userId: (req.user as TokenPayload)._id,
            })
            res.status(201).json({
                success: true,
                message: 'Note created successfully',
                note: new NotesDTO(savedNote),
            })
        } catch (error) {
            console.log('Error creating note', error)
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }
    }

    async getNotes(req: Request, res: Response) {
        const user = req.user as TokenPayload
        const params = req.query as GetNotesParams;
        try {
            const notes = await NotesService.getNotesByUserId(user._id, params)
            res.json({
                success: true,
                notes: notes.map((note) => new NotesDTO(note)),
            })
        } catch (error) {
            console.log('Error fetching notes', error)
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }
    }

    async getNoteById(req: Request, res: Response) {
        res.json({ message: 'GET Note by ID' })
    }

    async updateNote(req: Request, res: Response) {
        const noteId = req.params.id as string
        const noteData = req.body as NotesRequestBody
        const notesValidationError = validateNote(noteData)
        if (notesValidationError !== null) {
            return res.status(400).json({
                success: false,
                message: notesValidationError,
            })
        }
        try {
            const updatedNote = await NotesService.updateNoteById(noteId, noteData)
            res.json({
                success: true,
                message: 'Note updated successfully',
                note: new NotesDTO(updatedNote as Notes),
            })
        } catch (error) {
            console.log('Error updating note', error)
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            })

        }
    }
    async deleteNote(req: Request, res: Response) {
        const noteId = req.params.id
        try {
            await NotesService.deleteNoteById(noteId)
            res.json({
                success: true,
                message: 'Note deleted successfully',
                // deletedNote: new NotesDTO(note as Notes),
            });

        } catch (error) {
            console.log('Error deleting note', error)
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }
    }
    async togglePinNote(req: Request, res: Response) {
        const id = req.params.id
        const pin: boolean = req.body.pin
        try {
            await NotesService.pinNoteById(id, pin)
            res.json({
                success: true,
                message: 'Note pinned successfully',
                // pinnedNote: new NotesDTO(note as Notes),
            });

        } catch (error) {
            console.log('Error pinning note', error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }


    async updateOneField(req: Request, res: Response) {
        const id = req.params.id
        const { field } = req.body as UpdateRequestBody
        const { value } = req.body as UpdateRequestBody
        try {
            await NotesService.updateFields(id, { [field]: value })
            res.json({
                success: true,
                message: 'Note title updated successfully',
                // updatedNote: new NotesDTO(note as Notes),
            });

        } catch (error) {
            console.log('Error updating note title', error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }

}
export default new NotesController()

