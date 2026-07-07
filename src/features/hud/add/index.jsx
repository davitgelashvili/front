import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import useApi from '@/http/useApi'
import HudForm from '../HudForm/HudForm'
import { useToast } from '@/context/ToastContext'

export const AddHud = () => {
    // user_id მხოლოდ ადმინის როუტზე არსებობს (/clients/:user_id/hud/add) — ადმინი კლიენტის მაგივრად ქმნის
    const { user_id } = useParams()
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
            const res = await request({
                url: user_id ? '/dashboard/hud' : '/panel/hud',
                method: 'POST',
                data: user_id ? { ...values, user_id } : values,
            })
            if (res.success) { toast('HUD შეიქმნა', 'success'); navigate(user_id ? `/clients/${user_id}` : '/hud') }
            else setError(res.message || 'შეცდომა')
        } catch {
            setError('სერვერის შეცდომა')
        } finally {
            setLoading(false)
        }
    }

    return <HudForm attr={{ values, setValues, handleSubmit, title: 'ჰუდის შექმნა1', loading, error }} />
}
