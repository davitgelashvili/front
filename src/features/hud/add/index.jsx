import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import useApi from '../../../http/useApi'
import HudForm from '../HudForm/HudForm'

export const AddHud = () => {
    const { isToken } = useAuth()
    const { request } = useApi(isToken)
    const [values, setValues] = useState({
        title: "",
        slug: "",
        description: "",
        cover: "https://example.com/cover.jpg"
    })

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const respons = await request({
                url: '/v1/hud',
                method: 'POST',
                data: values
            })

            // if (respons.success) {
            // }
        } catch (error) {
            console.error('CREATE EVENT ERROR:', error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    return (
        <HudForm attr={{values, setValues, handleSubmit, title: 'ჰუდის შექმნა'}} />
    )
}
