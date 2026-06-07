import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useApi from '../../../http/useApi'
import { useAuth } from '../../../context/AuthContext'
import HudForm from '../HudForm/HudForm'
import { useToast } from '../../../context/ToastContext'

export const EditHud = () => {
    const { isToken, userRole } = useAuth()
    const { hud_id } = useParams()
    const { request } = useApi(isToken)
    const navigate = useNavigate()
    const toast = useToast()
    const prefix = userRole === 'Admin' ? '/dashboard' : '/panel'
    const [values, setValues] = useState({ title: '', slug: '', description: '', cover: '', requires_verification: false, max_tickets_per_buyer: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        async function load() {
            try {
                const res = await request({ url: `${prefix}/hud/${hud_id}`, method: 'GET' })
                if (res.success) setValues(prev => ({
                    ...prev,
                    ...res.hud,
                    requires_verification: !!res.hud.requires_verification,
                    max_tickets_per_buyer: res.hud.max_tickets_per_buyer ?? '',
                }))
            } catch {
                setError('ჩატვირთვის შეცდომა')
            }
        }
        load()
    }, [hud_id])

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await request({ url: `${prefix}/hud/${hud_id}`, method: 'PUT', data: values })
            if (res.success) { toast('HUD განახლდა', 'success'); navigate('/hud') }
            else setError(res.message || 'შეცდომა')
        } catch {
            setError('სერვერის შეცდომა')
        } finally {
            setLoading(false)
        }
    }

    return <HudForm attr={{ values, setValues, handleSubmit, title: 'ჰუდის რედაქტირება', loading, error }} />
}
