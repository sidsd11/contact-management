import { User, Mail, Phone, Trash2, ChevronDown, ChevronUp, MessageSquare, Pen } from 'lucide-react'

import { formatDateTime } from '../utils/ConvertDate.js'

const ContactCard = ({
    contact,
    expandedContactId,
    setExpandedContactId,
    onEdit,
    onDelete
}) => {
    const isExpanded = expandedContactId === contact._id

    return (
        <div className='shadow-lg rounded-lg p-4 bg-white transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl w-full h-full'>
            <p className='text-gray-800 text-xs sm:text-sm border-b pb-2'>
                <User className='inline size-4 mr-2' />
                {contact.name}
            </p>

            <p className='text-gray-800 text-xs sm:text-sm border-b pb-2'>
                <Mail className='inline size-4 mr-2' />
                {contact.email}
            </p>

            <p className='text-gray-800 text-xs sm:text-sm border-b pb-2'>
                <Phone className='inline size-4 mr-2' />
                {contact.phone}
            </p>

            <p className={`${contact.message?.length === 0 || contact?.message === '' ? 'italic text-gray-400' : 'text-gray-800'} text-xs sm:text-sm border-gray-800 border-b pb-2 transition-all duration-300 break-all whitespace-normal min-h-12.5'`}>
                <MessageSquare className='inline size-4 mr-2' />
                {
                    contact.message?.length === 0 || contact?.message === ''
                    ? 'Message not available'
                    : expandedContactId === contact._id ? contact.message : contact.message?.length > 50 ? contact.message.substring(0, 50) + '...' : contact.message
                }
            </p>

            {
                contact.message?.length > 50 &&
                <div className='flex justify-center items-center mt-3 gap-2'>
                    <p className='text-gray-600 cursor-pointer transition-all duration-300 hover:scale-[1.03]' onClick={() => setExpandedContactId(expandedContactId === contact._id ? null : contact._id)}>
                        {
                            isExpanded ? <ChevronUp /> : <ChevronDown />
                        }
                    </p>
                </div>
            }

            <p className='text-xs text-center text-gray-500 mt-2'>
                Created at: {formatDateTime(contact.createdAt)}
            </p>

            
            {
                contact.createdAt !== contact.updatedAt && (
                    <p className='text-xs text-center text-gray-500'>
                        Edited at: {formatDateTime(contact.updatedAt)}
                    </p>
                )
            }

            <div className='flex justify-center gap-4 mt-3'>
                <Pen className='size-5 cursor-pointer hover:scale-110' onClick={() => onEdit(contact)} />
                <Trash2 className='size-5 cursor-pointer text-red-500 hover:scale-110' onClick={() => onDelete(contact._id)} />
            </div>
        </div>
    )
}

export default ContactCard