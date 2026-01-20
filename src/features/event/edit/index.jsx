import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useApi from '../../../http/useApi'
import { useAuth } from '../../../context/AuthContext'
import EventForm from '../EventForm/EventForm'

export const EditEvent = () => {
    const { isToken } = useAuth()
    const { hud_id } = useParams()
    const { request } = useApi(isToken)
    const [values, setValues] = useState({
        title: "",
        slug: "",
        description: "",
        cover: ""
    })

    useEffect(() => {
        async function load() {
            try {
                const respons = await request({
                    url: `/hud/${hud_id}`,
                    method: 'GET'
                })

                if (respons.success) {
                    setValues(perv => ({...perv, ...respons.hud}))
                }
            } catch (error) {
                console.error(error)
            }
        }
        load()
    }, [hud_id])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const respons = await request({
                url: `/hud/${hud_id}`,
                method: 'PUT',
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
        <EventForm attr={{values, setValues, handleSubmit, title: 'რედაქტირება'}} />
    )
}
