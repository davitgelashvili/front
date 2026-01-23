import React, { useEffect, useState } from 'react';
import Form from './form';
import { useAuth } from '../../../context/AuthContext';
import useApi from '../../../http/useApi';
import { useParams } from 'react-router-dom';

export default function AddBatch() {
    const { event_id } = useParams();
    const { isToken } = useAuth()
    const { request } = useApi(isToken)
    const [values, setValues] = useState({
        event_id: event_id,
        name: '',
        price: '',
        capacity: ''
    })

    useEffect(()=>{
        setValues(prev => ({...prev, event_id: event_id}))
    }, [event_id])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const respons = await request({
                url: '/v1/batch',
                method: 'POST',
                data: values
            })

            console.log(respons)
            // if (respons.success) {
            // }
        } catch (error) {
            console.error('CREATE EVENT ERROR:', error);
        }
    }

    return (
        <div className='container-fluid box'>
            <h1>კალათის დამატება</h1>
            <Form attr={{ values, setValues, handleSubmit }} />
        </div>
    );
}
