import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import useApi from '../../http/useApi'
import InputText from '../../components/ui/InputText'
import CustomButton from '../../components/ui/CustomButton'

export default function Profile() {
    const { isToken } = useAuth()
    const { request } = useApi(isToken)
    const [values, setValues] = useState({ fullname: '', email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        async function load() {
            try {
                const res = await request({ url: '/auth/me', method: 'GET' })
                if (res.success) setValues({ fullname: res.user.fullname, email: res.user.email, password: '' })
            } catch {}
        }
        load()
    }, [isToken])

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setSuccess(false)
        setLoading(true)
        try {
            const res = await request({ url: '/auth/me', method: 'PUT', data: values })
            if (res.success) setSuccess(true)
            else setError(res.message || 'შეცდომა')
        } catch {
            setError('სერვერის შეცდომა')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container box">
            <h1>პროფილი</h1>
            <form onSubmit={handleSubmit}>
                <InputText title="სახელი და გვარი" type="text" name="fullname" value={values.fullname}
                    placeholder="სახელი და გვარი" onChange={(e) => setValues({ ...values, fullname: e.target.value })} />
                <InputText title="ელ-ფოსტა" type="email" name="email" value={values.email}
                    placeholder="example@mail.com" onChange={(e) => setValues({ ...values, email: e.target.value })} />
                <InputText title="ახალი პაროლი (სურვილისამებრ)" type="password" name="password" value={values.password}
                    placeholder="დატოვე ცარიელი თუ არ იცვლება" onChange={(e) => setValues({ ...values, password: e.target.value })} />
                {error && <p style={{ color: 'red', margin: '8px 0' }}>{error}</p>}
                {success && <p style={{ color: '#2e7d32', margin: '8px 0' }}>შენახულია</p>}
                <CustomButton type="submit" style="dark" loading={loading}>
                    შენახვა
                </CustomButton>
            </form>
        </div>
    )
}
