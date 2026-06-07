import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import useApi from '../../http/useApi'
import CustomButton from '../../components/ui/CustomButton'
import InputText from '../../components/ui/InputText'

export default function EditClient() {
    const { user_id } = useParams()
    const { isToken } = useAuth()
    const { request } = useApi(isToken)
    const navigate = useNavigate()
    const [values, setValues] = useState({ fullname: '', email: '', password: '', status: 'Visitor' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function load() {
            try {
                const res = await request({ url: '/dashboard/users', method: 'GET' })
                if (res.success) {
                    const user = res.users.find(u => String(u.user_id) === String(user_id))
                    if (user) setValues({ fullname: user.fullname, email: user.email, password: '', status: user.status })
                }
            } catch (err) {
                console.error(err)
            }
        }
        load()
    }, [isToken, user_id])

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await request({ url: `/dashboard/user/${user_id}`, method: 'PUT', data: values })
            if (res.success) {
                navigate('/clients')
            } else {
                setError(res.message || 'Error')
            }
        } catch (err) {
            setError(err?.response?.data?.message || 'Server error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='container box'>
            <CustomButton url={'/clients'} style={'light'}>
                ← Cancel
            </CustomButton>
            <h1>კლიენტის რედაქტირება</h1>
            <form onSubmit={handleSubmit}>
                <InputText title="სახელი და გვარი" type="text" name="fullname" value={values.fullname} placeholder="შეიყვანეთ სახელი" onChange={(e) => setValues({ ...values, fullname: e.target.value })} />
                <InputText title="ელ-ფოსტა" type="email" name="email" value={values.email} placeholder="example@mail.com" onChange={(e) => setValues({ ...values, email: e.target.value })} />
                <InputText title="ახალი პაროლი (სურვილისამებრ)" type="password" name="password" value={values.password} placeholder="დატოვე ცარიელი თუ არ იცვლება" onChange={(e) => setValues({ ...values, password: e.target.value })} />
                <InputText
                    title="სტატუსი"
                    type="select"
                    name="status"
                    value={values.status}
                    onChange={(e) => setValues({ ...values, status: e.target.value })}
                    options={[
                        { value: 'Visitor', label: 'Visitor' },
                        { value: 'Client',  label: 'Client' },
                    ]}
                />
                {error && <p style={{ color: 'red', margin: '8px 0' }}>{error}</p>}
                <CustomButton style="dark">
                    {loading ? 'ინახება...' : 'შენახვა'}
                </CustomButton>
            </form>
        </div>
    )
}
