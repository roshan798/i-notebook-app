import { NotesRequestBody } from "notes";
import { Request, Response } from "express"
import { validateNote } from "@utils/validation";
import NotesService from "@services/notes.service";
import { TokenPayload } from "@services/token.service";
import NotesDTO from "DTO/notes.dto";

class NotesController {
    async createNotes(req: Request, res: Response) {
        const noteData = req.body as NotesRequestBody;
        const notesValidationError = validateNote(noteData)
        if (notesValidationError !== null) {
            return res.status(400)
                .json({
                    success: false,
                    message: notesValidationError
                });
        }
        try {
            const savedNote = await NotesService.create(noteData)
            res.status(201).json({
                success: true,
                message: 'Note created successfully',
                note: new NotesDTO(savedNote)
            })
        } catch (error) {
            console.log("Error creating note", error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }




    }

    async getNotes(req: Request, res: Response) {
        const user = req.user as TokenPayload;
        const notes = await NotesService.getNotesByUserId(user._id)
        res.json({ message: 'GET Notes' });
    }

    async getNoteById(req: Request, res: Response) {
        res.json({ message: 'GET Note by ID' });
    }


    async updateNotes(req: Request, res: Response) {
        res.json({ message: 'PUT Notes' });
    }
    async deleteNotes(req: Request, res: Response) {
        res.json({ message: 'DELETE Notes' });
    }
}
export default new NotesController;