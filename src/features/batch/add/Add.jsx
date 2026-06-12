import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import useApi from '../../../http/useApi'
import Form from './Form'
import { useToast } from '../../../context/ToastContext'

export default function AddBatch() {
    const { event_id } = useParams()
    const { isToken, userRole } = useAuth()
    const { request } = useApi(isToken)
    const navigate = useNavigate()
    const toast = useToast()
    const prefix = userRole === 'Admin' ? '/dashboard' : '/panel'
    const [values, setValues] = useState({ event_id, name: '', price: '', capacity: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
 
    useEffect(() => {
        setValues(prev => ({ ...prev, event_id }))
    }, [event_id])

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await request({ url: `${prefix}/batch`, method: 'POST', data: values })
            if (res.success) { toast('კალათა შეიქმნა', 'success'); navigate(-1) }
            else setError(res.message || 'შეცდომა')
        } catch {
            setError('სერვერის შეცდომა')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='container-fluid box'>
            <h1>კალათის დამატება</h1>
            <Form attr={{ values, setValues, handleSubmit, loading, error }} />
        </div>
    )
}
