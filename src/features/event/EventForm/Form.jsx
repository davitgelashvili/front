import InputText from '../../../components/ui/InputText'
import CustomButton from '../../../components/ui/CustomButton'

const fields = [
    { title: 'სახელი',    type: 'text',     name: 'title',          placeholder: 'შეიყვანეთ სახელი' },
    { title: 'აღწერა',    type: 'textarea', name: 'description',    placeholder: 'შეიყვანეთ აღწერა' },
    { title: 'დასაწყისი', type: 'date',     name: 'start_datetime', placeholder: '' },
    { title: 'დამთავრება',type: 'date',     name: 'end_datetime',   placeholder: '' },
]

export default function Form({ attr }) {
    return (
        <form onSubmit={attr.handleSubmit}>
            {fields.map(f => (
                <InputText
                    key={f.name}
                    title={f.title}
                    type={f.type}
                    name={f.name}
                    value={attr.values[f.name] ?? ''}
                    placeholder={f.placeholder}
                    onChange={(e) => attr.setValues({ ...attr.values, [e.target.name]: e.target.value })}
                />
            ))}
            {attr.error && <p style={{ color: 'red', margin: '8px 0' }}>{attr.error}</p>}
            <CustomButton type="submit" style="dark" loading={attr.loading}>
                შენახვა
            </CustomButton>
        </form>
    )
}
