// types/notes.ts
export interface Note {
    id: string;
    title: string;
    content: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export interface CreateNoteResponse {
    success: boolean;
    message: string;
    note: Note;
}

export interface GetNotesResponse {
    success: boolean;
    message: string;
    notes: Note[];
}

export interface GetNoteResponse {
    success: boolean;
    message: string;
    note: Note;
}

export interface CreateNoteBody {
    title: string;
    content: string;
    tags: string[];
}
