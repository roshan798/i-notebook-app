export type User = {
    id: string
    name: string
    email: string
    createdAt: string | Date
}

export interface ApiResponse {
    success: boolean
    message: string
}

export type UserState = {
    user: User | null
}

export interface ChecklistItem {
    id: number;
    text: string;
    completed: boolean;
}
export interface CreateNoteBody {
    title?: string
    content?: string
    checklist?: ChecklistItem[]
    tags: string[]
    type: "note" | "list"
    pinned: boolean
}

export interface CreateNoteResponse extends ApiResponse {
    note: Note
}
export interface GetNotesResponse extends ApiResponse {
    notes: Note[]
}
export interface GetNoteResponse extends CreateNoteResponse { }
export interface Note extends CreateNoteBody {
    id: string
    pinnedAt?: string | Date
    createdAt: string | Date
    updatedAt: string | Date
}

// for the notesSlice
export type RootState = {
    user: UserState
    notesStore: NotesState
}
export interface NotesState {
    pinnedNotes: Note[];
    unpinnedNotes: Note[];
    loading: boolean;
    error?: string | null;
}


export interface UpdateRequestBody {
    update: "title" | "content" | "pinned"
    value: string | boolean
}
export interface UpdateNoteResponse extends ApiResponse {
}
