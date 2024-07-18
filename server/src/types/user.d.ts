import { ObjectId } from "mongoose";
export type UserId = ObjectId | string;
export interface User {
    _id?: UserId
    id?: string;
    name: string;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
