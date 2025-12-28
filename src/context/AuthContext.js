import { createContext, useContext, useState, useEffect } from 'react'
import { auth } from './authStorage'
import { getApi } from '../http/Api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(auth.getUser())
    const [token, setToken] = useState(auth.getAccessToken())
    const [loading, setLoading] = useState(false)

    const login = async (email, password) => {
        setLoading(true)
        const res = await getApi({
            url: '/auth/login',
            method: 'POST',
            data: { email, password }
        })

        if (res.success) {
            auth.setSession({
                accessToken: res.accessToken,
                user: res.user
            })
            setUser(res.user)
            setToken(res.accessToken)
        }

        setLoading(false)
        return res
    }

    const logout = async () => {
        auth.clear()
        setUser(null)
        setToken('')
    }

    useEffect(() => {
        // init on refresh
        const u = auth.getUser()
        const t = auth.getAccessToken()

        if (u && t) {
            setUser(u)
            setToken(t)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
