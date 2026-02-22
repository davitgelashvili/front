import { useState } from 'react'
import InputText from '../../../components/ui/InputText'
import useApi from '../../../http/useApi'
import { useAuth } from '../../../context/AuthContext'

export default function Form() {
    const { request } = useApi()
    const { login } = useAuth()
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const respons = await request({
                url: '/auth/login',
                method: 'POST',
                data: {
                    ...values
                }
            })

            if (respons.success) {
                login(respons.accessToken)
            }
            console.log(respons)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form>
            <InputText
                title={'ელ-ფოსტა.'}
                type={'text'}
                name={'email'}
                value={values.email}
                placeholder={'შეიყვანეთ ინფორამცია'}
                onChange={(e) => (
                    console.log(e), setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                )}
            />
            <InputText
                title={'პაროლი'}
                type={'text'}
                name={'password'}
                value={values.password}
                placeholder={'შეიყვანეთ ინფორამცია'}
                onChange={(e) => (
                    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                )}
            />
            <button onClick={handleLogin}>login</button>
        </form>
    )
}
