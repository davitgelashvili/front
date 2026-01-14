import React from 'react'
import { useAuth } from '../../../../context/AuthContext'

export const UserMenu = () => {
    const { logout } = useAuth()

    function handleLogout() {
        logout()
    }

    return (
        <button onClick={handleLogout}>log Out</button>
    )
}
