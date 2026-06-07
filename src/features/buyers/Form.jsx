import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import useApi from '../../http/useApi'
import { useAuth } from '../../context/AuthContext'
import InputText from '../../components/ui/InputText'
import CustomButton from '../../components/ui/CustomButton'
import styles from './styles.module.scss'

const EMPTY = { name: '', personal_id: '', phone: '', email: '', notes: '' }

export default function BuyerForm({ mode }) {
    const { id } = useParams()
    const { isToken } = useAuth()
    const { request } = useApi(isToken)
    const navigate = useNavigate()
    const [values, setValues] = useState(EMPTY)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (mode === 'edit' && id) {
            request({ url: `/dashboard/buyer/${id}`, method: 'GET' })
                .then(res => {
                    if (res.success) {
                        const b = res.buyer
                        setValues({
                            name: b.name || '',
                            personal_id: b.personal_id || '',
                            phone: b.phone || '',
                            email: b.email || '',
                            notes: b.notes || '',
                        })
                    }
                })
                .catch(console.error)
        }
    }, [isToken, id, mode])

    function set(field) {
        return e => setValues(v => ({ ...v, [field]: e.target.value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const url = mode === 'edit' ? `/dashboard/buyer/${id}` : '/dashboard/buyer'
            const method = mode === 'edit' ? 'PUT' : 'POST'
            const res = await request({ url, method, data: values })
            if (res.success) {
                navigate(mode === 'edit' ? `/buyers/${id}` : '/buyers')
            } else {
                setError(res.message || 'შეცდომა')
            }
        } catch {
            setError('სერვერის შეცდომა')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container">
            <Link to="/buyers" className={styles.backLink}>← მყიდველები</Link>
            <div className="box" style={{ maxWidth: 560 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 24px' }}>
                    {mode === 'edit' ? 'მყიდველის რედაქტირება' : 'ახალი მყიდველი'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <InputText title="სახელი და გვარი *" type="text" value={values.name}
                        placeholder="სახელი გვარი" onChange={set('name')} />
                    <InputText title="პირადი ნომერი" type="text" value={values.personal_id}
                        placeholder="01234567890" onChange={set('personal_id')} />
                    <InputText title="ტელეფონი" type="text" value={values.phone}
                        placeholder="+995 5XX XXX XXX" onChange={set('phone')} />
                    <InputText title="ელ-ფოსტა" type="email" value={values.email}
                        placeholder="example@mail.com" onChange={set('email')} />
                    <InputText title="შენიშვნა" type="text" value={values.notes}
                        placeholder="სურვილისამებრ" onChange={set('notes')} />

                    {error && <p style={{ color: '#c62828', margin: '8px 0', fontSize: 14 }}>{error}</p>}

                    <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                        <CustomButton type="submit" style="dark" loading={loading}>
                            {mode === 'edit' ? 'შენახვა' : 'დამატება'}
                        </CustomButton>
                        <CustomButton url="/buyers" style="light">გაუქმება</CustomButton>
                    </div>
                </form>
            </div>
        </div>
    )
}
