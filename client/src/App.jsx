import { Route, Routes, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Contacts from './pages/Contacts'

const App = () => {
    return (
        <div>
            <Toaster />
            <Routes>
                <Route path='/contacts' element={<Contacts />} />
                <Route path='/*' element={<Navigate to='/contacts' replace />} />
            </Routes>
        </div>
    )
}

export default App