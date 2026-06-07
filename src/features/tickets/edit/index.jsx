import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import useApi from '../../../http/useApi'
import CustomButton from '../../../components/ui/CustomButton'
import InputText from '../../../components/ui/InputText'

export default function EditTicket() {
    const { ticket_id } = useParams()
    const { isToken } = useAuth()
    const { request } = useApi(isToken)
    const navigate = useNavigate()
    const [values, setValues] = useState({ status: 'valid', buyer_id: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function load() {
            try {
                const res = await request({ url: '/dashboard/ticket', method: 'GET' })
                if (res.success) {
                    const ticket = res.tickets.find(t => t.ticket_id === ticket_id)
                    if (ticket) setValues({ status: ticket.status, buyer_id: ticket.buyer_id })
                }
            } catch (err) {
                console.error(err)
            }
        }
        load()
    }, [isToken, ticket_id])

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await request({ url: `/dashboard/ticket/${ticket_id}`, method: 'PUT', data: values })
            if (res.success) {
                navigate('/tickets')
            } else {
                setError(res.message || 'Error')
            }
        } catch (err) {
            setError(err?.response?.data?.message || 'Server error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='container box'>
            <CustomButton url={'/tickets'} style={'light'}>
                ← Cancel
            </CustomButton>
            <h1>ტიკეტის რედაქტირება</h1>
            <p style={{ color: '#888', marginBottom: '16px' }}>{ticket_id}</p>
            <form onSubmit={handleSubmit}>
                <InputText
                    title="სტატუსი"
                    type="select"
                    name="status"
                    value={values.status}
                    onChange={(e) => setValues({ ...values, status: e.target.value })}
                    options={[
                        { value: 'valid', label: 'Valid' },
                        { value: 'used', label: 'Used' },
                        { value: 'cancelled', label: 'Cancelled' },
                    ]}
                />
                <InputText
                    title="Buyer ID"
                    type="text"
                    name="buyer_id"
                    value={values.buyer_id}
                    placeholder="მყიდველის ID"
                    onChange={(e) => setValues({ ...values, buyer_id: e.target.value })}
                />
                {error && <p style={{ color: 'red', margin: '8px 0' }}>{error}</p>}
                <CustomButton style="dark">
                    {loading ? 'ინახება...' : 'შენახვა'}
                </CustomButton>
            </form>
        </div>
    )
}
