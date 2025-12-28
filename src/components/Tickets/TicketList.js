import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getApi } from '../../http/Api'

export const TicketList = ({ eventId }) => {
    const [data, setData] = useState(null)
    const { token, user } = useAuth()

    useEffect(() => {
        const load = async () => {
            if (!token || !user?.userId) return

            const res = await getApi({
                url: `/events/${eventId}/tickets`,
                method: 'GET'
            })

            console.log(res)

            if (res.success) {
                setData(res.tickets)
            }
        }

        load()
    }, [eventId])

    return (
        <div style={{ padding: '10px' }}>
            {data?.map((ticket, index) => (
                <div key={ticket.id} style={{ border: '1px solid black', padding: '10px', marginTop: '20px' }}>
                    <p>{ticket.type} {index + 1}</p>
                    <p>{ticket.date}</p>
                    <div style={{display: 'flex', gap: '10px'}}>
                        {ticket?.tiers.map((tier, tierIndex) => (
                            <div key={tier.id} style={{ border: '1px solid black', padding: '10px', marginTop: '20px' }}>
                                <p>კალათა: {tier.tier_no}</p>
                                <p>{tier.price_cents}</p>
                                <button disabled={!tier.is_active}>ყიდვა</button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
