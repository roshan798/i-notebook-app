import type { User } from 'schema/types/user'

export default class UserDTO {
    name: string
    email: string
    id: string
    createdAt: Date
    constructor(user: User) {
        this.id = user._id!.toString()
        this.name = user.name
        this.email = user.email
        this.createdAt = user.createdAt!
    }
}
