import { createContext, useEffect, useState} from 'react'

export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    })

    const value = {
        backendUrl,
        loading, setLoading
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}