import React, { useState } from 'react'
import InputText from '../../../components/ui/InputText'
import useApi from '../../../http/useApi'
import { useAuth } from '../../../context/AuthContext'

export default function Form() {
    const { request } = useApi()
    const { login } = useAuth()
    const [values, setValues] = useState({
        email: 'admin@gmail.com',
        password: 'Kaikaco123.'
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
            <InputText />
            <button onClick={handleLogin}>login</button>
        </form>
    )
}
