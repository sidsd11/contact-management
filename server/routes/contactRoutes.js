import express from 'express'
import { addContact, deleteContact, editContact, getAllContacts, getSingleContact } from '../controllers/contactControllers.js'

const contactRouter = express.Router()

contactRouter.post('/add-contact', addContact)
contactRouter.patch('/edit-contact/:id', editContact)
contactRouter.delete('/delete-contact/:id', deleteContact)
contactRouter.get('/get-all-contacts', getAllContacts)
contactRouter.get('/get-single-contact/:id', getSingleContact)

export default contactRouter