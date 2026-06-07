import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useApi from '../../../http/useApi'
import { useAuth } from '../../../context/AuthContext'
import EventForm from '../EventForm/EventForm'
import { useToast } from '../../../context/ToastContext'

export const EditEvent = () => {
    const { isToken, userRole } = useAuth()
    const { hud_id, event_id } = useParams()
    const { request } = useApi(isToken)
    const navigate = useNavigate()
    const toast = useToast()
    const prefix = userRole === 'Admin' ? '/dashboard' : '/panel'
    const [values, setValues] = useState({
        title: "",
        description: "",
        start_datetime: "",
        end_datetime: "",
        min_price: "",
        max_price: ""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        async function load() {
            try {
                const respons = await request({
                    url: `${prefix}/event/${event_id}`,
                    method: 'GET'
                })

                if (respons.success) {
                    const e = respons.event
                    setValues(prev => ({
                        ...prev,
                        ...e,
                        start_datetime: e.start_datetime ? e.start_datetime.slice(0, 10) : '',
                        end_datetime: e.end_datetime ? e.end_datetime.slice(0, 10) : '',
                    }))
                }
            } catch (error) {
                console.error(error)
            }
        }
        load()
    }, [event_id, request])

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await request({ url: `${prefix}/event/${event_id}`, method: 'PUT', data: values })
            if (res.success) { toast('ივენთი განახლდა', 'success'); navigate(`/hud/${hud_id}`) }
            else setError(res.message || 'შეცდომა')
        } catch (error) {
            setError('სერვერის შეცდომა')
        } finally {
            setLoading(false)
        }
    }

    return (
        <EventForm attr={{values, setValues, handleSubmit, title: 'რედაქტირება', loading, error}} />
    )
}
