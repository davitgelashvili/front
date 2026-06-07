import InputText from '../../../components/ui/InputText'
import CustomButton from '../../../components/ui/CustomButton'

const textFields = [
    { title: 'სახელი', type: 'text',     name: 'title',       placeholder: 'სახელი' },
    { title: 'აღწერა', type: 'textarea', name: 'description', placeholder: 'აღწერა' },
    { title: 'ლინკი',  type: 'text',     name: 'slug',        placeholder: 'slug' },
    { title: 'სურათი', type: 'text',     name: 'cover',       placeholder: 'https://...' },
]

export default function Form({ attr }) {
    const v = attr?.values ?? {}
    const set = (name, value) => attr?.setValues({ ...v, [name]: value })

    return (
        <form onSubmit={attr?.handleSubmit}>
            {textFields.map(f => (
                <InputText
                    key={f.name}
                    title={f.title}
                    type={f.type}
                    name={f.name}
                    value={v[f.name] ?? ''}
                    placeholder={f.placeholder}
                    onChange={e => set(e.target.name, e.target.value)}
                />
            ))}

            {/* ვერიფიკაცია */}
            <div style={{ margin: '16px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
                <input
                    type="checkbox"
                    id="req_ver"
                    checked={!!v.requires_verification}
                    onChange={e => set('requires_verification', e.target.checked)}
                    style={{ width: 18, height: 18, cursor: 'pointer' }}
                />
                <label htmlFor="req_ver" style={{ fontSize: 14, cursor: 'pointer', margin: 0 }}>
                    ვერიფიკაცია სავალდებულოა ყიდვამდე
                </label>
            </div>

            <InputText
                title="მაქს. ბილეთი ერთ მყიდველზე (ცარიელი = ულიმიტო)"
                type="text"
                name="max_tickets_per_buyer"
                value={v.max_tickets_per_buyer ?? ''}
                placeholder="მაგ: 2"
                onChange={e => set('max_tickets_per_buyer', e.target.value)}
            />

            {attr?.error && <p style={{ color: 'red', margin: '8px 0', fontSize: 14 }}>{attr.error}</p>}
            <CustomButton type="submit" style="dark" loading={attr?.loading}>
                შენახვა
            </CustomButton>
        </form>
    )
}
