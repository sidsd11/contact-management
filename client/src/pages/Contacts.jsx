import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Loader, CirclePlus } from 'lucide-react'

import { AppContext } from '../context/AppContext'
import Navbar from '../components/Navbar'
import ContactCard from '../components/ContactCard'
import ContactForm from '../components/ContactForm'

const emptyForm = {name: '', email: '', phone: '', message: ''}

const Contacts = () => {
    const {backendUrl, loading} = useContext(AppContext)

    const [allContacts, setAllContacts] = useState([])

    const [formOpen, setFormOpen] = useState(false)
    const [editId, setEditId] = useState(null)
    const [form, setForm] = useState(emptyForm)

    const [expandedContactId, setExpandedContactId] = useState(null)

    const getAllContacts = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/contacts/get-all-contacts`)
            if (data.success) {
                setAllContacts(data.contacts)
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    const handleAdd = async (e) => {
        try {
            e.preventDefault()

            const url = editId ? `${backendUrl}/api/contacts/edit-contact/${editId}` : `${backendUrl}/api/contacts/add-contact`

            const method = editId ? axios.patch : axios.post

            const { data } = await method(url, form)
            if (data.success) {
                toast.success(data.message)
                setFormOpen(false)
                setForm(emptyForm)
                setEditId(null)
                getAllContacts()
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    const handleEdit = (contact) => {
        try {
            setEditId(contact._id)
            setForm(contact)
            setFormOpen(true)
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    const handleDelete = async (id) => {
        try {
                const {data} = await axios.delete(`${backendUrl}/api/contacts/delete-contact/${id}`)
            if (data.success) {
                toast.success(data.message)
                getAllContacts()
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (backendUrl) {
            getAllContacts()
        }
    }, [backendUrl])

    useEffect(() => {
        if (!formOpen) return

        document.title = editId
            ? 'Edit contact'
            : 'Add contact'

        return () => {
            document.title = 'My Contacts'
        }
    }, [formOpen, editId])


    return (
        loading
        ? (
            <div className='flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-200 to-purple-400'>
                <h1 className='text-3xl text-center font-semibold text-black mb-5'>
                    Loading your page...
                </h1>
                <Loader className='animate-spin' />
            </div>
        ) : (
            <>
                <Navbar />
                <div className='bg-linear-to-br from-blue-200 to-purple-400'>
                    <div className='min-h-screen flex flex-col items-center justify-center pt-18 sm:pt-22 w-[70%] sm:w-[80%] mx-auto'>
                        <h1 className='text-3xl text-center font-semibold'>
                            My Contacts
                        </h1>

                        <h1 className='text-2xl text-center font-semibold mb-6 cursor-pointer hover:scale-110 transition-all underline' onClick={() => setFormOpen(true)}>
                            <CirclePlus className='size-5 inline-block' /> Add a new contact
                        </h1>

                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full'>
                            {
                                allContacts.length === 0
                                ? (
                                    <h1 className='text-3xl font-semibold text-black mt-10 col-span-full text-center'>
                                        No contacts found
                                    </h1>
                                ) : (
                                    allContacts.map(contact => (
                                        <ContactCard
                                            key={contact._id}
                                            contact={contact}
                                            expandedContactId={expandedContactId}
                                            setExpandedContactId={setExpandedContactId}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    ))
                                )
                            }
                        </div>
                    </div>
                </div>

                {
                    formOpen && (
                        <ContactForm
                            title={editId ? 'Edit contact' : 'Add a new contact'}
                            form={form}
                            setForm={setForm}
                            onSubmit={handleAdd}
                            onClose={() => {
                                setFormOpen(false)
                                setEditId(null)
                                setForm(emptyForm)
                            }}
                        />
                    )
                }
            </>
        )
    )
}

export default Contacts