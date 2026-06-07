import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useApi from '../../../http/useApi'
import { useAuth } from '../../../context/AuthContext'
import Form from './Form'

export const AddTicket = () => {
    const { isToken, userRole } = useAuth()
    const { request } = useApi(isToken)
    const navigate = useNavigate()
    const [form, setForm] = useState({ buyer_name: '', status: 'valid', buyer_id: '', batch_id: '', event_id: '', hud_id: '', amount: 1 })
    const url = userRole === 'Admin' ? '/dashboard/ticket' : '/panel/ticket'

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const res = await request({ url, method: 'POST', data: form })
            if (res.success) navigate('/tickets')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="container">
            <div className="box">
                <h2>Create Ticket</h2>
                <Form form={form} setForm={setForm} handleSubmit={handleSubmit} />
            </div>
        </div>
    )
}