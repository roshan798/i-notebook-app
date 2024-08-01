import { Request, Response, NextFunction } from 'express';
import NotesModel from '../schema/models/notes';
import { UserId } from '../schema/types/user';
import { TokenPayload } from '@services/token.service';

const checkOwnership = async (req: Request, res: Response, next: NextFunction) => {
    const noteId = req.params.id;
    const user = req.user as TokenPayload; 
    const userId: UserId = user._id;
    if (!noteId) {
        return res.status(400).json({
            success: false,
            message: 'Note ID is required',
        });
    }

    try {
        const note = await NotesModel.findById(noteId);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found',
            });
        }

        if (note.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to perform this action',
            });
        }

        next();
    } catch (error) {
        console.error('Error checking ownership', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export default checkOwnership;
