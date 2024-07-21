import type { Notes } from "notes";
import mongoose, { Schema } from "mongoose";

const NotesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    tags: {
        type: [String],
        required: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    accessTo: {
        type: [Schema.Types.ObjectId],
        ref: "users",
        required: false,
    },
},
    {
        timestamps: true,
    });

export default mongoose.model<Notes>("notes", NotesSchema);
