import type { ObjectId } from 'mongodb';
import type { UserId } from './user';

export type NotesId = ObjectId | string;
export interface NotesRequestBody {
    title: string;
    content: string;
    tags: string[];
    userId: UserId;
}

export interface Notes extends NotesRequestBody {
    _id?: NotesId;
    id?: string;
    createdAt: Date;
    updatedAt: Date;
    userId: UserId;
    accessTo?: UserId[];
}
