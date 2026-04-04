import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useApi from '../../../http/useApi'
import { useAuth } from '../../../context/AuthContext'
import BatchForm from '../BatchForm/BatchForm'

export const EditBatch = () => {
    const { isToken } = useAuth()
    const { batch_id } = useParams()
    const { request } = useApi(isToken)
    const [values, setValues] = useState({
        name: '',
        price: '',
        capacity: ''
    })

    useEffect(() => {
        async function load() {
            try {
                const respons = await request({
                    url: `/dashboard/batch/${batch_id}`,
                    method: 'GET'
                })

                if (respons.success) {
                    setValues(prev => ({...prev, ...respons.batch}))
                }
            } catch (error) {
                console.error(error)
            }
        }
        load()
    }, [batch_id, request])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await request({
                url: `/dashboard/batch/${batch_id}`,
                method: 'PUT',
                data: values
            })
        } catch (error) {
            console.error('UPDATE BATCH ERROR:', error);
        }
    }

    return (
        <BatchForm attr={{values, setValues, handleSubmit, title: 'რედაქტირება'}} />
    )
}