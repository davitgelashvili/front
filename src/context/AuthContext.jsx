import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isToken, setIsToken] = useState(null)

    useEffect(()=>{
        const _token = localStorage.getItem('token')
        if(_token) {
            setIsToken(_token)
        }
    }, [])

    function login(_token) {
        localStorage.setItem('token', _token)
        setIsToken(_token)
    }

    function logout() {
        localStorage.removeItem('token')
        setIsToken(null)
    }

    return (
        <AuthContext.Provider value={{isToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)