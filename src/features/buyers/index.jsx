import { useEffect, useState } from 'react'
import useApi from '@/http/useApi'
import { useAuth } from '@/context/AuthContext'
import CustomButton from '@/components/ui/CustomButton/CustomButton'
import { Section } from '@/components/Section/Section'
import { FilterBar } from './FilterBar'
import { List } from './List'

export const Buyers = () => {
    const { isToken, userRole } = useAuth()
    const { request } = useApi(isToken)
    const [buyers, setBuyers] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const isAdmin = userRole === 'Admin'
    const prefix = isAdmin ? '/dashboard' : '/panel'

    useEffect(() => { load() }, [isToken, search])

    async function load() {
        setLoading(true)
        try {
            const url = search ? `${prefix}/buyers?search=${encodeURIComponent(search)}` : `${prefix}/buyers`
            const res = await request({ url, method: 'GET' })
            if (res.success) setBuyers(res.buyers)
        } catch (err) { console.error(err) }
        finally { setLoading(false) }
    }

    async function handleDelete(id) {
        if (!window.confirm('ნამდვილად წაშალო ეს მყიდველი?')) return
        try {
            await request({ url: `/dashboard/buyer/${id}`, method: 'DELETE' })
            setBuyers(prev => prev.filter(b => b.id !== id))
        } catch (err) { console.error(err) }
    }

    return (
        <div className="container">
            <Section
                title={'მყიდველები'}
                elements={<>
                    {isAdmin && (
                        <div className='col-auto'>
                            <CustomButton url="/buyers/add" style="dark">Create Buyer</CustomButton>
                        </div>
                    )}
                </>}>
                <FilterBar search={search} setSearch={setSearch} />
                <List buyers={buyers} loading={loading} isAdmin={isAdmin} onDelete={handleDelete} />
            </Section>
        </div>
    )
}