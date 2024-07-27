import mongoose, { Schema } from 'mongoose'
import type { User } from 'schema/types/user'

const userSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model<User>('User', userSchema, 'users')
