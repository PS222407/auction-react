import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const ConfigContext = createContext()

export const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState()

    useEffect(() => {
        async function getConfig() {
            const response = await fetch('/config.json')
                .catch((error) => {
                    if (error.message === 'Failed to fetch') toast('Network error', { type: 'error' })
                })
                .catch((error) => {
                    if (error.message === 'Failed to fetch') toast('Network error', { type: 'error' })
                })
            const data = await response.json()
            setConfig(data)
        }

        getConfig()
    }, [])

    return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
}

export default ConfigContext
