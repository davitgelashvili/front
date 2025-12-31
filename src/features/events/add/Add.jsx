import React, { useState } from 'react'
import Form from './Form'
import useApi from '../../../http/useApi'
import { useAuth } from '../../../context/AuthContext'

export default function AddEvent() {
    const { isToken } = useAuth()
    const { request } = useApi(isToken)
    const [values, setValues] = useState({
        title: 'ჩემი პირველი ღონისძიება',
        description: 'ეს არის მოკლე აღწერა ღონისძიების შესახებ',
        location: 'თბილისი, საქართველო',
        startAt: '2025-12-31T12:00:00.000Z',
        endAt: '2026-01-01T12:00:00.000Z',
        cover: 'https://example.com/cover-image.jpg',
        status: 'published' // 'draft', 'published' ან 'cancelled'
    })

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const respons = await request({
                url: '/events',
                method: 'POST',
                data: values
            })

            console.log(respons)
            // if (respons.success) {
            // }
        } catch (error) {
            console.error('CREATE EVENT ERROR:', error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    return (
        <div>
            <h1>დამატება</h1>
            <Form attr={{ values, setValues, handleSubmit }} />
        </div>
    )
}
