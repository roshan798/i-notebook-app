export type User = {
    id: string
    name: string
    email: string
    createdAt: string | Date
}
export interface ApiResponse {
    succees: boolean
    message: string
}

export type UserState = {
    user: User | null
}

export interface CreateNoteBody {
    title: string
    content: string
    tags: string[]
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
    pinned: boolean,
    pinnedAt?: string | Date
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
