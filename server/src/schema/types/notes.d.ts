import type { ObjectId } from 'mongodb'
import type { UserId } from './user'
import { Document } from 'mongoose'

export type NotesId = ObjectId | string
export interface NotesRequestBody {
    title: string
    content: string
    tags: string[]
    userId: UserId
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
