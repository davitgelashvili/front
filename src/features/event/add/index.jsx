import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import useApi from '../../../http/useApi'
import EventForm from '../EventForm/EventForm'
import { useParams } from 'react-router-dom'

export const AddEvent = () => {
    const { hud_id } = useParams();
    const { isToken } = useAuth()
    const { request } = useApi(isToken)
    const [values, setValues] = useState({
        hud_id: hud_id,
        title: '',
        description: '',
        start_datetime: '',
        end_datetime: '',
        min_price: '',
        max_price: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const respons = await request({
                url: '/dashboard/event',
                method: 'POST',
                data: values
            })

            if (respons.success) {
                setValues({
                    hud_id: hud_id,
                    title: '',
                    description: '',
                    start_datetime: '',
                    end_datetime: '',
                    min_price: '',
                    max_price: ''
                })
                alert('success')
            }
        } catch (error) {
            console.error('CREATE EVENT ERROR:', error);
        }
    }

    useEffect(() => {
        async function load() {
            try {
                const response = await request({
                    url: `/dashboard/hud/${hud_id}`,
                    method: 'GET'
                });

                if (response.success) {
                    setValues(prev => ({ ...prev, title: response?.hud?.title, description: response?.hud?.description }))
                }
            } catch (error) {
                console.error('LOAD TICKETS ERROR:', error);
                alert(error.message);
            }
        }
        load();
    }, [hud_id, request]);

    return (
        <EventForm attr={{ values, setValues, handleSubmit, title: 'ჰუდის შექმნა' }} />
    )
}
