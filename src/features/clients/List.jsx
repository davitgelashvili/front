import { useEffect, useState } from 'react'
import useApi from '../../http/useApi'
import { useAuth } from '../../context/AuthContext'
import CustomButton from '../../components/ui/CustomButton'
import ListItemCard from '../../components/ui/ListItemCard'

export default function ClientList() {
    const [users, setUsers] = useState([])
    const { isToken } = useAuth()
    const { request } = useApi(isToken)

    useEffect(() => {
        async function load() {
            try {
                const response = await request({ url: '/dashboard/users', method: 'GET' })
                if (response.success) setUsers(response.users)
            } catch (error) {
                console.error(error)
            }
        }
        load()
    }, [isToken])

    const handleDelete = async (userId) => {
        if (!window.confirm('ნამდვილად წაშალო ეს კლიენტი?')) return
        try {
            await request({ url: `/dashboard/user/${userId}`, method: 'DELETE' })
            setUsers(prev => prev.filter(u => u.user_id !== userId))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="container">
            <div className='d-flex justify-content-end'>
                <div>
                    <CustomButton url={'/clients/add'} style={'dark'}>
                        Add Client
                    </CustomButton>
                </div>
            </div>
            <div className="row">
                {users.map(user => {
                    const initials = user.fullname
                        .split(' ')
                        .map(w => w[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2)

                    return (
                        <div className="col-4" key={user.user_id}>
                            <ListItemCard
                                avatar={initials}
                                title={user.fullname}
                                description={user.email}
                                stats={[
                                    { label: 'HUDs', value: user.hud_count },
                                    { label: 'Events', value: user.event_count },
                                    { label: 'Tickets', value: user.ticket_count },
                                ]}
                                actions={[
                                    { label: 'Manage', url: `/clients/${user.user_id}`, style: 'light' },
                                    { label: 'Edit', url: `/clients/${user.user_id}/edit`, style: 'light' },
                                ]}
                                onDelete={() => handleDelete(user.user_id)}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
