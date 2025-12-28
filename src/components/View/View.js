import React, { use, useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getApi } from '../../http/Api'
import { TicketList } from '../Tickets/TicketList'

export const View = ({ eventId }) => {
    const [data, setData] = useState(null)
    const { token, user } = useAuth()

    useEffect(() => {
            const load = async () => {
                if (!token || !user?.userId) return
    
                const res = await getApi({
                    url: `/events/${eventId}`,
                    method: 'GET'
                })

                if (res.success) {
                    setData(res.event)
                }
            }
    
            load()
        }, [eventId])

    return (
        <div style={{marginTop: '100px'}}>
            <p>{data?.title}</p>
            <p>{data?.description}</p>
            <p>{data?.start_at}</p>
            <p>{data?.location}</p>
            <TicketList eventId={eventId}/>
        </div>
    )
}
