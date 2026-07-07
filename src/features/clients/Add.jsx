import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import useApi from '@/http/useApi'
import CustomButton from '@/components/ui/CustomButton/CustomButton'
import InputText from '@/components/ui/InputText/InputText'
import { Section } from '@/components/Section/Section'

const empty = { fullname: '', email: '', password: '', status: 'Visitor' }

const fields = (values, setValues) => [
    { title: 'სახელი და გვარი', type: 'text', name: 'fullname', placeholder: 'შეიყვანეთ სახელი', value: values.fullname },
    { title: 'ელ-ფოსტა', type: 'email', name: 'email', placeholder: 'example@mail.com', value: values.email },
    { title: 'პაროლი', type: 'password', name: 'password', placeholder: '8+ სიმბოლო', value: values.password },
].map(f => ({ ...f, onChange: (e) => setValues({ ...values, [e.target.name]: e.target.value }) }))

export default function AddClient() {
    const { isToken } = useAuth()
    const { request } = useApi(isToken)
    const navigate = useNavigate()
    const [values, setValues] = useState(empty)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await request({ url: '/dashboard/user', method: 'POST', data: values })
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
        <div className='container'>
            <Section
                title={'კლიენტის დამატება'}
                elements={<>
                    <div className='col'>
                        <CustomButton url={'/clients'} style={'light'}>
                            Cancel
                        </CustomButton>
                    </div>
                </>}>
                <form className='box' onSubmit={handleSubmit}>
                    {fields(values, setValues).map(f => (
                        <InputText key={f.name} title={f.title} type={f.type} name={f.name} value={f.value} placeholder={f.placeholder} onChange={f.onChange} />
                    ))}
                    <InputText
                        title="სტატუსი"
                        type="select"
                        name="status"
                        value={values.status}
                        onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                        options={[
                            { value: 'Visitor', label: 'Visitor' },
                            { value: 'Client', label: 'Client' },
                            { value: 'Admin', label: 'Admin' },
                        ]}
                    />
                    {error && <p style={{ color: 'red', margin: '8px 0' }}>{error}</p>}
                    <CustomButton style="dark">
                        {loading ? 'იქმნება...' : 'დამატება'}
                    </CustomButton>
                </form>
            </Section>
        </div>
    )
}
