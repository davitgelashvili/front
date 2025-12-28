import React, { use, useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getApi } from '../../http/Api'
import { View } from '../View/View'

export const MyEvents = () => {
    const [data, setData] = useState(null)
    const [eventId, setEventId] = useState(null)
    const { token, user } = useAuth()

    useEffect(() => {
        const load = async () => {
            if (!token || !user?.userId) return

            const res = await getApi({
                url: `/events/user/${user.userId}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.success) {
                setData(res.events)
            }
        }

        load()
    }, [token, user])

    return (
        <div>
            {data && data?.map(event => (
                <div key={event.event_id} onClick={() => setEventId(event.event_id)}>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                </div>
            ))}
            {eventId && <View eventId={eventId} />}
        </div>
    )
}
