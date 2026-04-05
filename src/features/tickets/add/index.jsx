import React, { useState } from 'react'
import useApi from '../../../http/useApi'
import { useAuth } from '../../../context/AuthContext'
import Form from './Form'

export const AddTicket = () => {
    const { isToken } = useAuth()
    const { request } = useApi(isToken)
    const [form, setForm] = useState({
        buyer_name: '',
        status: 'valid',
        buyer_id: '',
        batch_id: '',
        event_id: '',
        hud_id: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await request({
                url: `/dashboard/ticket`,
                method: 'POST',
                data: form
            })
            alert('Ticket created!')
            setForm({
                buyer_name: '',
                status: 'valid',
                buyer_id: '',
                batch_id: '',
                event_id: '',
                hud_id: ''
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h2>Create Ticket</h2>
            <Form form={form} setForm={setForm} handleSubmit={handleSubmit} />
        </div>
    )
}