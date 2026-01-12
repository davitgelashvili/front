import React, { useEffect, useState } from 'react';
import Form from './form';
import { useAuth } from '../../../context/AuthContext';
import useApi from '../../../http/useApi';
import { useParams } from 'react-router-dom';

const createDay = (data = {}) => ({
    ...data,
    type: "DAY",
    name: data.name || "",
    date: data.date || "",
    tiers: data.tiers?.length ? data.tiers : [{ tier_no: 1, capacity: 0, price_cents: 0 }]
});

export default function AddEvent() {
    const { id } = useParams();
    const { isToken } = useAuth()
    const { request } = useApi(isToken)
    const [values, setValues] = useState({
        hud_id: id,
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
                url: '/event',
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


    useEffect(() => {
        async function load() {
            try {
                const response = await request({
                    url: `/hud/${id}`,
                    method: 'GET'
                });

                if (response.success) {
                    setValues(prev => ({...prev, title: response?.hud?.title, description: response?.hud?.description}))
                }
            } catch (error) {
                console.error('LOAD TICKETS ERROR:', error);
                alert(error.message);
            }
        }
        load();
    }, [id, request]);

    return (
        <div>
            <h1>ივენთის დამატება</h1>
            <button onClick={() => console.log(values, hudData)}>test</button>
            <Form attr={{ values, setValues, handleSubmit }} />
        </div>
    );
}
