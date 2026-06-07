import { useState } from 'react'
import InputText from '../../../components/ui/InputText'
import CustomButton from '../../../components/ui/CustomButton'
import useApi from '../../../http/useApi'
import { useAuth } from '../../../context/AuthContext'

export default function Form() {
    const { request } = useApi()
    const { login } = useAuth()
    const [values, setValues] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await request({ url: '/auth/login', method: 'POST', data: values })
            if (res.success) {
                login(res.accessToken, res.user?.role)
            } else {
                setError(res.message || 'შესვლა ვერ მოხერხდა')
            }
        } catch {
            setError('სერვერის შეცდომა')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <InputText
                title={'ელ-ფოსტა'}
                type={'email'}
                name={'email'}
                value={values.email}
                placeholder={'შეიყვანეთ ელ-ფოსტა'}
                onChange={(e) => setValues(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            />
            <InputText
                title={'პაროლი'}
                type={'password'}
                name={'password'}
                value={values.password}
                placeholder={'შეიყვანეთ პაროლი'}
                onChange={(e) => setValues(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            />
            {/* {error && <p style={{ color: 'red', margin: '8px 0' }}>{error}</p>} */}
            <CustomButton type="submit" style="dark" loading={loading}>
                შესვლა
            </CustomButton>
        </form>
    )
}
