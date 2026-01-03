import mongoose, { mongo } from 'mongoose'

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log(`Connected to ${mongoose.connection.name} database`)
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/ContactManagement`)
}

export default connectDB