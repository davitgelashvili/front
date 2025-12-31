import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
    // withCredentials: true,
})

export default function useApi(token) {
    const [errorr, setErrorr] = useState(null)
    const [loading, setLoading] = useState(false)
    const { logout } = useAuth()

    const request = useCallback(async ({ url, method, data = null }) => {
        setLoading(true)
        setErrorr(null)

        try {
            const respons = await api({
                url,
                method,
                data,
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined
                }
            })

            return respons.data
        } catch (error) {
            if (error?.response?.status === 401) {
                logout()
                setErrorr(error)
                // navigate("/login")
            }
            throw error
        } finally {
            setLoading(false)
        }
    }, [token, logout])

    return { request, errorr, loading }
}