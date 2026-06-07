import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import useApi from '../../../http/useApi'
import HudForm from '../HudForm/HudForm'
import { useToast } from '../../../context/ToastContext'

export const AddHud = () => {
    const { isToken } = useAuth()
    const { request } = useApi(isToken)
    const navigate = useNavigate()
    const toast = useToast()
    const [values, setValues] = useState({ title: '', slug: '', description: '', cover: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await request({ url: '/panel/hud', method: 'POST', data: values })
            if (res.success) { toast('HUD შეიქმნა', 'success'); navigate('/hud') }
            else setError(res.message || 'შეცდომა')
        } catch {
            setError('სერვერის შეცდომა')
        } finally {
            setLoading(false)
        }
    }

    return <HudForm attr={{ values, setValues, handleSubmit, title: 'ჰუდის შექმნა', loading, error }} />
}
