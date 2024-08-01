import { Document } from 'mongoose'
import type { ObjectId } from 'mongodb'
import type { UserId } from './user'

export type NotesId = ObjectId | string
export interface NotesRequestBody {
    title?: string
    content?: string
    checklist?: ChecklistItem[];
    tags: string[]
    type: "note" | "list"
    userId: UserId
    pinned: boolean
    pinnedAt?: Date
}


interface ChecklistItem {
    text: string;
    completed: boolean;
}


export interface Notes extends NotesRequestBody, Document {
    _id?: NotesId
    id?: string
    createdAt: Date
    updatedAt: Date
    userId: UserId
    accessTo?: UserId[]
    pinned: boolean
    pinnedAt?: Date
}

export interface GetNotesParams {
    id?: string
    sortBy?: "createdAt" | "updatedAt",
    orderBy?: "asc" | "desc",
    limit?: number,
    page?: number,
}

export interface UpdateRequestBody {
    field: "title" | "content" | "pinned"
    value: string | boolean
}