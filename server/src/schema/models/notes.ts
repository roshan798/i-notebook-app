import mongoose, { Schema } from 'mongoose';
import type { Notes } from '../types/notes';

const ChecklistItemSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    }
);

const NotesSchema = new Schema<Notes>(
    {
        title: {
            type: String,
            required: false,
            default: '',
        },
        content: {
            type: String,
            required: false,
            default: '',
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
        tags: {
            type: [String],
            required: false,
        },
        accessTo: {
            type: [Schema.Types.ObjectId],
            ref: 'users',
            required: false,
        },
        pinned: {
            type: Boolean,
            default: false,
        },
        pinnedAt: {
            type: Date,
            required: false,
        },
        checklist: {
            type: [ChecklistItemSchema],
            required: false,
        },
        type: {
            type: String,
            enum: ['note', 'list'],
            default: 'note',
        },
        color: {
            type: String,
            default: "default"
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<Notes>('notes', NotesSchema);
