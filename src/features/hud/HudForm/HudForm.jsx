import React, { useState } from 'react'
import Form from './Form'
import useApi from '../../../http/useApi'
import { useAuth } from '../../../context/AuthContext'

export default function HudForm({ attr }) {
    // const { isToken } = useAuth()
    // const { request } = useApi(isToken)
    // const [values, setValues] = useState({
    //     title: "Tech Conference 2026",
    //     slug: "tech-conference",
    //     description: "Annual tech conference in Tbilisi",
    //     cover: "https://example.com/cover.jpg"
    // })

    // async function handleSubmit(e) {
    //     e.preventDefault()
    //     try {
    //         const respons = await request({
    //             url: '/hud',
    //             method: 'POST',
    //             data: values
    //         })

    //         console.log(respons)
    //         // if (respons.success) {
    //         // }
    //     } catch (error) {
    //         console.error('CREATE EVENT ERROR:', error);
    //         return res.status(500).json({ success: false, message: error.message });
    //     }
    // }

    return (
        <div className='container'>
            <h1>{attr.title}</h1>
            <Form attr={{
                values: attr?.values, 
                setValues: attr?.setValues, 
                handleSubmit: attr?.handleSubmit
            }} />
        </div>
    )
}
