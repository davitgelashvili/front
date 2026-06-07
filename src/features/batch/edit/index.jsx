import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useApi from '../../../http/useApi'
import { useAuth } from '../../../context/AuthContext'
import BatchForm from '../BatchForm/BatchForm'
import { useToast } from '../../../context/ToastContext'

export const EditBatch = () => {
    const { isToken, userRole } = useAuth()
    const { batch_id } = useParams()
    const { request } = useApi(isToken)
    const navigate = useNavigate()
    const toast = useToast()
    const prefix = userRole === 'Admin' ? '/dashboard' : '/panel'

    const [values, setValues]   = useState({ name: '', price: '', capacity: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError]     = useState('')

    useEffect(() => {
        async function load() {
            try {
                const res = await request({ url: `${prefix}/batch/${batch_id}`, method: 'GET' })
                if (res.success) setValues(prev => ({ ...prev, ...res.batch }))
            } catch (err) { console.error(err) }
        }
        load()
    }, [batch_id])

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await request({ url: `${prefix}/batch/${batch_id}`, method: 'PUT', data: values })
            if (res.success) { toast('კალათა განახლდა', 'success'); navigate(-1) }
            else setError(res.message || 'შეცდომა')
        } catch {
            setError('სერვერის შეცდომა')
        } finally {
            setLoading(false)
        }
    }

    return <BatchForm attr={{ values, setValues, handleSubmit, loading, error, title: 'კალათის რედაქტირება' }} />
}
