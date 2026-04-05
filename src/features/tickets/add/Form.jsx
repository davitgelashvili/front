import React from 'react'
import InputText from '../../../components/ui/InputText'
import { HudInput } from './HudInput'
import { EventInput } from './EventInput'
import { BatchInput } from './BatchInput'

export default function Form({ form, setForm, handleSubmit }) {
    const statusOptions = [
        { value: 'valid', label: 'Valid' },
        { value: 'used', label: 'Used' },
        { value: 'cancelled', label: 'Cancelled' }
    ]

    return (
        <form onSubmit={handleSubmit}>
            <InputText
                title="Buyer Name"
                type="text"
                name="buyer_name"
                value={form.buyer_name}
                placeholder="შეიყვანეთ მყიდველის სახელი"
                onChange={(e) => setForm({ ...form, buyer_name: e.target.value })}
            />
            <InputText
                title="Status"
                type="select"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                options={statusOptions}
            />
            <InputText
                title="Buyer ID"
                type="text"
                name="buyer_id"
                value={form.buyer_id}
                placeholder="შეიყვანეთ მყიდველის ID"
                onChange={(e) => setForm({ ...form, buyer_id: e.target.value })}
            />
            <HudInput
                value={form.hud_id}
                onChange={(e) => setForm({ ...form, hud_id: e.target.value, event_id: '', batch_id: '' })}
            />
            <EventInput
                hudId={form.hud_id}
                value={form.event_id}
                onChange={(e) => setForm({ ...form, event_id: e.target.value, batch_id: '' })}
            />
            <BatchInput
                eventId={form.event_id}
                value={form.batch_id}
                onChange={(e) => setForm({ ...form, batch_id: e.target.value })}
            />
            <button type="submit">Create Ticket</button>
        </form>
    )
}