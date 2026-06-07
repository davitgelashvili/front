import React, { useEffect, useState } from 'react'
import useApi from '../../../http/useApi'
import { useAuth } from '../../../context/AuthContext'
import InputText from '../../../components/ui/InputText'

export const BatchInput = ({ eventId, value, onChange }) => {
    const { isToken, userRole } = useAuth()
    const { request } = useApi(isToken)
    const [batches, setBatches] = useState([])
    const prefix = userRole === 'Admin' ? '/dashboard' : '/panel'

    useEffect(() => {
        if (eventId) {
            loadBatches(eventId)
        } else {
            setBatches([])
        }
    }, [eventId])

    async function loadBatches(eventId) {
        try {
            const respons = await request({
                url: `${prefix}/event/${eventId}/batch`,
                method: 'GET'
            })
            if (respons.success) {
                setBatches(respons.batches || [])
            }
        } catch (error) {
            console.error(error)
        }
    }

    const options = batches.map(batch => ({ value: batch.id, label: batch.name }))

    return (
        <InputText
            title="Batch"
            type="select"
            value={value}
            onChange={onChange}
            options={options}
        />
    )
}