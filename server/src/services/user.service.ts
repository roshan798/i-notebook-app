import UserModel from '../schema/models/user'
import { User, FilterQuery } from 'schema/types/user'

class UserService {
    async createUser(user: User): Promise<User> {
        try {
            const newUser = new UserModel(user)
            await newUser.save()
            return newUser
        } catch (error) {
            console.error('Error creating user:', error)
            throw new Error('Failed to create user')
        }
    }

    // Get a user by email
    async getUserByEmail(email: string): Promise<User | null> {
        try {
            const user = await UserModel.findOne({ email }).exec()
            if (!user) {
                console.log('User not found')
                return null
            }
            return user
        } catch (error) {
            console.error('Error retrieving user:', error)
            throw new Error('Failed to retrieve user')
        }
    }

    async getUser(filter: FilterQuery): Promise<User | null> {
        try {
            const user = await UserModel.findOne(filter).exec()
            if (!user) {
                console.log('User not found')
                return null
            }
            return user
        } catch (error) {
            console.error('Error retrieving user:', error)
            throw new Error('Failed to retrieve user')
        }
    }
}

export default new UserService()
