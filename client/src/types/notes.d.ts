// types/notes.ts
import { Note } from "../store/types"


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

export interface CreateNoteBody {
    title: string
    content: string
    tags: string[]
}
