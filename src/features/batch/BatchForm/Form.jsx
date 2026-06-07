import InputText from '../../../components/ui/InputText'
import CustomButton from '../../../components/ui/CustomButton'

export default function Form({ attr }) {
    const inputData = [
        {
            title: 'სახელი',
            type: 'text',
            name: 'name',
            value: attr.values.name,
            placeholder: 'შეიყვანეთ ინფორამცია',
            onChange: (e) => attr.setValues({ ...attr.values, [e.target.name]: e.target.value }),
        },
        {
            title: 'ფასი',
            type: 'text',
            name: 'price',
            value: attr.values.price,
            placeholder: 'შეიყვანეთ ინფორამცია',
            onChange: (e) => attr.setValues({ ...attr.values, [e.target.name]: e.target.value }),
        },
        {
            title: 'რაოდენობა',
            type: 'text',
            name: 'capacity',
            value: attr.values.capacity,
            placeholder: 'შეიყვანეთ ინფორამცია',
            onChange: (e) => attr.setValues({ ...attr.values, [e.target.name]: e.target.value }),
        },
    ]

    const isActive = attr.values.is_active === undefined ? true : !!attr.values.is_active

    return (
        <form onSubmit={attr.handleSubmit}>
            {inputData?.map((input) => (
                <InputText
                    key={input.name}
                    title={input.title}
                    type={input.type}
                    name={input.name}
                    value={input.value}
                    placeholder={input.placeholder}
                    onChange={input.onChange}
                />
            ))}

            <div style={{ margin: '16px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
                <input
                    type="checkbox"
                    id="batch_active"
                    checked={isActive}
                    onChange={e => attr.setValues({ ...attr.values, is_active: e.target.checked ? 1 : 0 })}
                    style={{ width: 18, height: 18, cursor: 'pointer' }}
                />
                <label htmlFor="batch_active" style={{ fontSize: 14, cursor: 'pointer', margin: 0 }}>
                    კალათა აქტიურია
                    {isActive
                        ? <span style={{ color: '#16a34a', marginLeft: 6, fontSize: 12 }}>✓ გაყიდვაში</span>
                        : <span style={{ color: '#c62828', marginLeft: 6, fontSize: 12 }}>✕ გათიშული</span>
                    }
                </label>
            </div>

            {attr.error && <p style={{ color: '#c62828', fontSize: 14, margin: '8px 0' }}>{attr.error}</p>}

            <CustomButton type="submit" style="dark" loading={attr.loading}>
                შენახვა
            </CustomButton>
        </form>
    )
}