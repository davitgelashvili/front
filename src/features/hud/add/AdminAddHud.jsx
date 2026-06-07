import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import useApi from '../../../http/useApi'
import HudForm from '../HudForm/HudForm'

export default function AdminAddHud() {
    const { user_id } = useParams()
    const { isToken } = useAuth()
    const { request } = useApi(isToken)
    const navigate = useNavigate()
    const [values, setValues] = useState({ title: '', slug: '', description: '', cover: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await request({ url: '/dashboard/hud', method: 'POST', data: { ...values, user_id } })
            if (res.success) navigate(`/clients/${user_id}`)
            else setError(res.message || 'შეცდომა')
        } catch {
            setError('სერვერის შეცდომა')
        } finally {
            setLoading(false)
        }
    }

    return <HudForm attr={{ values, setValues, handleSubmit, title: 'ჰუდის დამატება', loading, error }} />
}
