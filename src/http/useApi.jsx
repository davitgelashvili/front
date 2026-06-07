import axios from 'axios'
import { useCallback, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

const api = axios.create({ baseURL: BASE, withCredentials: true })

// Shared refresh promise — prevents concurrent refresh calls
let refreshing = null

export default function useApi(token) {
    const [errorr, setErrorr] = useState(null)
    const [loading, setLoading] = useState(false)
    const { logout, login } = useAuth()

    const request = useCallback(async ({ url, method, data = null }) => {
        setLoading(true)
        setErrorr(null)

        try {
            const res = await api({ url, method, data, headers: { Authorization: token ? `Bearer ${token}` : undefined } })
            return res.data
        } catch (error) {
            if (error?.response?.status === 401) {
                try {
                    if (!refreshing) {
                        refreshing = axios.post(`${BASE}/auth/refresh`, {}, { withCredentials: true })
                            .finally(() => { refreshing = null })
                    }
                    const { data: rd } = await refreshing
                    if (!rd?.success) throw new Error('refresh failed')

                    const role = localStorage.getItem('role')
                    login(rd.accessToken, role)

                    const retry = await api({
                        url, method, data,
                        headers: { Authorization: `Bearer ${rd.accessToken}` }
                    })
                    return retry.data
                } catch {
                    logout()
                    setErrorr(error)
                    throw error
                }
            }
            throw error
        } finally {
            setLoading(false)
        }
    }, [token, logout, login])

    return { request, errorr, loading }
}
