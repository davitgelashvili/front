import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import useApi from '../../../http/useApi'
import EventForm from '../EventForm/EventForm'
import { useToast } from '../../../context/ToastContext'

export const AddEvent = () => {
    const { hud_id } = useParams()
    const { isToken, userRole } = useAuth()
    const { request } = useApi(isToken)
    const navigate = useNavigate()
    const toast = useToast()
    const prefix = userRole === 'Admin' ? '/dashboard' : '/panel'
    const [values, setValues] = useState({ hud_id, title: '', description: '', start_datetime: '', end_datetime: '', min_price: '', max_price: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        async function load() {
            try {
                const res = await request({ url: `${prefix}/hud/${hud_id}`, method: 'GET' })
                if (res.success) setValues(prev => ({ ...prev, title: res.hud?.title, description: res.hud?.description }))
            } catch {}
        }
        load()
    }, [hud_id])

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await request({ url: `${prefix}/event`, method: 'POST', data: values })
            if (res.success) { toast('ივენთი შეიქმნა', 'success'); navigate(-1) }
            else setError(res.message || 'შეცდომა')
        } catch {
            setError('სერვერის შეცდომა')
        } finally {
            setLoading(false)
        }
    }

    return <EventForm attr={{ values, setValues, handleSubmit, title: 'დღის შექმნა', loading, error }} />
}
