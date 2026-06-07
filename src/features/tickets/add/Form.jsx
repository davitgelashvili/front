import InputText from '../../../components/ui/InputText'
import CustomButton from '../../../components/ui/CustomButton'
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
                title="მყიდველის სახელი"
                type="text"
                name="buyer_name"
                value={form.buyer_name}
                placeholder="სახელი გვარი"
                onChange={(e) => setForm({ ...form, buyer_name: e.target.value })}
            />
            <InputText
                title="Buyer ID"
                type="text"
                name="buyer_id"
                value={form.buyer_id}
                placeholder="b_xxxxx"
                onChange={(e) => setForm({ ...form, buyer_id: e.target.value })}
            />
            <InputText
                title="სტატუსი"
                type="select"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                options={statusOptions}
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
            <InputText
                title="რაოდენობა"
                type="number"
                name="amount"
                value={form.amount}
                min={1}
                max={10}
                onChange={(e) => setForm({ ...form, amount: Math.max(1, Math.min(10, parseInt(e.target.value) || 1)) })}
            />
            <div style={{ marginTop: 16 }}>
                <CustomButton type="submit" style="dark">ბილეთის შექმნა</CustomButton>
            </div>
        </form>
    )
}