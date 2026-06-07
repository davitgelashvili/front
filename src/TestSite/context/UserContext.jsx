import { createContext, useContext, useEffect, useState } from 'react'
import { testApi } from '../http/api'

const UserContext = createContext(null)

export function TestUserProvider({ children }) {
    const [users, setUsers] = useState([])
    const [activeUser, setActiveUser] = useState(null)

    useEffect(() => {
        testApi.users()
            .then(r => {
                setUsers(r.data.users)
                const savedId = localStorage.getItem('test_user_id')
                const found = r.data.users.find(u => u.id === savedId)
                setActiveUser(found || r.data.users[0] || null)
            })
            .catch(console.error)
    }, [])

    function selectUser(id) {
        const user = users.find(u => u.id === id)
        if (user) {
            setActiveUser(user)
            localStorage.setItem('test_user_id', id)
        }
    }

    function updateCoins(userId, coins) {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, coins } : u))
        setActiveUser(prev => prev?.id === userId ? { ...prev, coins } : prev)
    }

    return (
        <UserContext.Provider value={{ users, activeUser, selectUser, updateCoins }}>
            {children}
        </UserContext.Provider>
    )
}

export function useTestUser() {
    return useContext(UserContext)
}
