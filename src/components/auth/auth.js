import React from 'react'
import { getApi } from '../../http/Api'
import { useAuth } from '../../context/AuthContext'

export const Auth = () => {

    const { login, logout } = useAuth()

    const handleLogin = async () => {
        await login('admin@gmail.com', 'Kaikaco123.')
    }

    const handleLogOut = async () => {
        await logout()
    }

    return (
        <div>
            <button onClick={handleLogin}>
                Login
            </button>
            <button onClick={handleLogOut}>
                Log Out
            </button>
        </div>
    )
}
