import React, { useEffect, useState } from 'react'
import useApi from '../../../http/useApi'
import { useAuth } from '../../../context/AuthContext'
import InputText from '../../../components/ui/InputText'

export const EventInput = ({ hudId, value, onChange }) => {
    const { isToken } = useAuth()
    const { request } = useApi(isToken)
    const [events, setEvents] = useState([])

    useEffect(() => {
        if (hudId) {
            loadEvents(hudId)
        } else {
            setEvents([])
        }
    }, [hudId])

    async function loadEvents(hudId) {
        try {
            const respons = await request({
                url: `/dashboard/hud/${hudId}/event`,
                method: 'GET'
            })
            if (respons.success) {
                setEvents(respons.events || [])
            }
        } catch (error) {
            console.error(error)
        }
    }

    const options = events.map(event => ({ value: event.id, label: event.title }))

    return (
        <InputText
            title="Event"
            type="select"
            value={value}
            onChange={onChange}
            options={options}
        />
    )
}