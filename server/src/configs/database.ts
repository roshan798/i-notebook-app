import mongoose from 'mongoose'
import config from './config'
const connectDB = async () => {
    try {
        await mongoose.connect(config.database.uri)
        console.log('Connected to MongoDB successfully')
    } catch (error) {
        console.error('Error connecting to MongoDB:')
    }
}
export default connectDB
