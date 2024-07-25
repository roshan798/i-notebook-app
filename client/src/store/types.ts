export type User = {
    id: string
    name: string
    email: string
    createdAt: string | Date
}

export type UserState = {
    user: User | null
}

export interface CreateNoteBody {
    title: string
    content: string
    tags: string[]
}
export interface CreateNoteResponse {
    success: boolean
    message: string
    note: Note
}
export interface GetNotesResponse {
    success: boolean
    message: string
    notes: Note[]
}
export interface GetNoteResponse {
    success: boolean
    message: string
    note: Note
}
export interface Note extends CreateNoteBody {
    id: string
    createdAt: string | Date
    updatedAt: string | Date
}
export interface NotesState {
    notes: Note[];
    loading: boolean;
    error?: string | null;
}

export type RootState = {
    user: UserState
    notesStore: NotesState
}
