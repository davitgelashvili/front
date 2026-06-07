import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isToken, setIsToken] = useState(null)
    const [userRole, setUserRole] = useState(null)

    useEffect(()=>{
        const _token = localStorage.getItem('token')
        const _role = localStorage.getItem('role')
        if(_token) {
            setIsToken(_token)
            setUserRole(_role || 'client')
        }
    }, [])

    function login(_token, _role) {
        localStorage.setItem('token', _token)
        localStorage.setItem('role', _role || 'client')
        setIsToken(_token)
        setUserRole(_role || 'client')
    }

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        setIsToken(null)
        setUserRole(null)
    }

    return (
        <AuthContext.Provider value={{isToken, userRole, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
