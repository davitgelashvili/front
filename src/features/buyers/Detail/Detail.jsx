import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useApi from '@/http/useApi'
import { useAuth } from '@/context/AuthContext'
import { ProfileInfo } from './ProfileInfo'
import { TicketsList } from './TicketsList'

export default function BuyerDetail() {
    const { id } = useParams()
    const { isToken, userRole } = useAuth()
    const { request } = useApi(isToken)
    const [buyer, setBuyer] = useState(null)
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const isAdmin = userRole === 'Admin'
    const prefix = isAdmin ? '/dashboard' : '/panel'
 
    useEffect(() => {
        async function load() {
            try {
                const res = await request({ url: `${prefix}/buyer/${encodeURIComponent(id)}`, method: 'GET' })
                if (res.success) { setBuyer(res.buyer); setTickets(res.tickets) }
            } catch (err) { console.error(err) }
            finally { setLoading(false) }
        }
        load()
    }, [isToken, id])

    if (loading) return <div className="container" style={{ paddingTop: 60, textAlign: 'center', color: '#aaa' }}>იტვირთება...</div>
    if (!buyer) return <div className="container" style={{ paddingTop: 60, textAlign: 'center', color: '#c62828' }}>მყიდველი ვერ მოიძებნა</div>

    return (
        <div className="container">
            <ProfileInfo buyer={buyer} isAdmin={isAdmin} id={id} />
            <TicketsList tickets={tickets} />
        </div>
    )
}
