import contactModel from '../models/contactModel.js'

export const addContact = async (req, res) => {
    try {
        const {name, email, phone, message} = req.body
        if (!name || !email || !phone) {
            return res.json({success: false, message: 'Missing details'})
        }

        const createContact = new contactModel({name, email, phone, message})
        await createContact.save()

        return res.json({success: true, message: 'Contact added successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const editContact = async (req, res) => {
    try {
        const contactId = req.params.id
        const {name, email, phone, message} = req.body
        if (!name || !email || !phone) {
            return res.json({success: false, message: 'Missing details'})
        }

        const selectedContact = await contactModel.findByIdAndUpdate(
            contactId,
            {
                $set: {
                    name, email, phone, message
                }
            },
            {new: true, runValidators: true}
        )
        if (!selectedContact) {
            return res.json({success: false, message: 'Contact not found'})
        }

        return res.json({success: true, message: 'Contact edited successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const deleteContact = async (req, res) => {
    try {
        const contactId = req.params.id

        const selectedContact = await contactModel.findByIdAndDelete(contactId)
        if (!selectedContact) {
            return res.json({success: false, message: 'Contact not found'})
        }

        return res.json({success: true, message: 'Contact deleted successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const getAllContacts = async (req, res) => {
    try {
        const {sort = 'createdAt', order = 'desc'} = req.query
        const allowedSort = ['createdAt', 'name', 'email', 'phone']
        const allowedOrder = ['asc', 'desc']
        if (!allowedSort.includes(sort) || !allowedOrder.includes(order)) {
            return res.json({success: false, message: 'Invalid sort method'})
        }

        const allContacts = await contactModel.find().sort({[sort]: order === 'asc' ? 1 : -1})

        return res.json({success: true, message: 'All contacts fetched successfully', contacts: allContacts})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const getSingleContact = async (req, res) => {
    try {
        const contactId = req.params.id

        const selectedContact = await contactModel.findById(contactId)
        if (!selectedContact) {
            return res.json({success: false, message: 'Contact not found'})
        }

        return res.json({success: true, message: 'Contact fetched successfully', contact: selectedContact})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}