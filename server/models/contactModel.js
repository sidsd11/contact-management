import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: Number, required: true},
    message: {type: String, default: ''}
}, {timestamps: true})

const contactModel = mongoose.models.contact || mongoose.model('contact', contactSchema)

export default contactModel