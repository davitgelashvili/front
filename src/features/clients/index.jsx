import { useEffect, useState } from 'react'
import useApi from '@/http/useApi'
import { useAuth } from '@/context/AuthContext'
import CustomButton from '@/components/ui/CustomButton/CustomButton'
import { Section } from '@/components/Section/Section'
import { List } from './List'

export { default as AddClient } from './Add'
export { default as EditClient } from './Edit'
export { default as ClientManage } from './Manage'

export const Clients = () => {
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
            <Section
                title={'Clients'}
                elements={<>
                    <div className='col-auto'>
                        <CustomButton url={'/clients/add'} style={'dark'}>
                            Add Client
                        </CustomButton>
                    </div>
                </>}>
                <List users={users} onDelete={handleDelete} />
            </Section>
        </div>
    )
}