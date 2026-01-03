import { User, Mail, Phone, MessageSquare } from 'lucide-react'

const ContactForm = ({ title, form, setForm, onSubmit, onClose }) => {
    const fieldIcons = {
        name: User,
        email: Mail,
    }

    return (
        <div
            className='fixed inset-0 bg-black/50 z-999 flex justify-center items-center'
            onClick={onClose}
        >
            <div
                className='flex flex-col items-center mt-20 px-4 text-center bg-slate-900 p-10 rounded-lg shadow-lg w-[70%] sm:w-96 text-indigo-300 text-xs sm:text-sm z-50'
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className='text-sm sm:text-2xl text-center font-semibold text-white mb-5'>
                    {title}
                </h1>

                <form onSubmit={onSubmit} className='w-full overflow-auto'>
                    {['name', 'email'].map((field) => {
                        const Icon = fieldIcons[field]
                        return (
                            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-lg bg-[#333A5C]' key={field}>
                                <Icon className='inline size-4 mr-2' />
                                <input
                                    value={form[field]}
                                    onChange={e => setForm({...form, [field]: e.target.value})}
                                    placeholder={`Enter ${field}`}
                                    className='bg-transparent outline-none text-white'
                                    required
                                />
                            </div>
                        )
                    })}

                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-lg bg-[#333A5C]'>
                        <Phone className='inline size-4 mr-2' />
                        <input
                            type='number'
                            value={form.phone}
                            onChange={e => setForm({...form, phone: e.target.value})}
                            placeholder='Enter phone'
                            className='bg-transparent outline-none text-white'
                            required
                        />
                    </div>

                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-lg bg-[#333A5C]'>
                        <MessageSquare className='inline size-4 mr-2' />
                        <input
                            type='text'
                            value={form.message}
                            onChange={e => setForm({...form, message: e.target.value})}
                            placeholder='Enter message (optional)'
                            className='bg-transparent outline-none text-white'
                            required
                        />
                    </div>

                    <button className='w-full py-3 bg-linear-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer'>
                        Save contact
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ContactForm