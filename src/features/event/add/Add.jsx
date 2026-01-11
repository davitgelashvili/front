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
    const { isToken } = useAuth();
    const { id } = useParams();
    const { request } = useApi(isToken);
    const [values, setValues] = useState([]);

    function addForm() {
        setValues(prev => [...prev, createDay()]);
    }

    function addTier(dayIndex) {
        setValues(prev => prev.map((day, index) => {
            if (index !== dayIndex) return day;

            const nexttier_no = (day.tiers?.length ?? 0) + 1;
            return {
                ...day,
                tiers: [...(day.tiers || []), { tier_no: nexttier_no, capacity: 0, price_cents: 0 }]
            };
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const payload = values.map(day => ({
                ...day,
                date: day.date ? day.date.split('T')[0] : "" // მხოლოდ YYYY-MM-DD
            }));

            const response = await request({
                url: `/events/${id}/tickets/setup`,
                method: 'POST',
                data: payload
            });

            if (response.success) {
                console.log('Tickets created:', response);
                alert('Tickets created successfully!');
            }
        } catch (error) {
            console.error('CREATE EVENT ERROR:', error);
            alert(error.message);
        }
    }


    useEffect(() => {
        async function load() {
            try {
                const response = await request({
                    url: `/events/${id}/tickets`,
                    method: 'GET'
                });

                if (response.success && response.tickets?.length) {
                    setValues(response.tickets.map(ticket => createDay(ticket)));
                }
            } catch (error) {
                console.error('LOAD TICKETS ERROR:', error);
                alert(error.message);
            }
        }
        load();
    }, [id]);

    return (
        <div>
            <h1>ბილეთის დამატება</h1>
            <Form attr={{ values, setValues, handleSubmit, addForm, addTier }} />
        </div>
    );
}
