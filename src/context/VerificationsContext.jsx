import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import useApi from '../http/useApi'
import { useAuth } from './AuthContext'

const VerificationsContext = createContext(null)

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:5001/ws'
const RECONNECT_MS = 3000

export function VerificationsProvider({ children }) {
    const { isToken, userRole } = useAuth()
    const { request } = useApi(isToken)
    const isAdmin = userRole === 'Admin'

    const [pendingCount, setPendingCount] = useState(0)
    const [toasts, setToasts]             = useState([])
    const [liveItems, setLiveItems]       = useState([])

    const wsRef       = useRef(null)
    const timerRef    = useRef(null)
    // always-fresh callback ref so stale WS closure always calls current handler
    const handleNewRef = useRef(null)

    function handleNew(v) {
        setPendingCount(c => c + 1)
        setLiveItems(prev => [v, ...prev])
        const id = Date.now()
        setToasts(prev => [...prev, { id, v }])
        setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 5000)
    }
    handleNewRef.current = handleNew

    // load initial pending count (role-aware)
    useEffect(() => {
        if (!isToken) return
        const url = isAdmin
            ? '/dashboard/verifications?status=pending'
            : '/panel/verifications?status=pending'
        request({ url, method: 'GET' })
            .then(res => { if (res.success) setPendingCount(res.verifications.length) })
            .catch(() => {})
    }, [isToken, isAdmin])

    // WS connection — onmessage calls handleNewRef.current so it's always fresh
    useEffect(() => {
        if (!isToken) return

        function connect() {
            const ws = new WebSocket(WS_URL)
            wsRef.current = ws

            ws.onopen = () => console.log('[WS] connected')
            ws.onmessage = (e) => {
                try {
                    const data = JSON.parse(e.data)
                    if (data.type === 'verification_new') handleNewRef.current(data.verification)
                } catch {}
            }
            ws.onclose = () => {
                console.log('[WS] disconnected, reconnecting...')
                timerRef.current = setTimeout(connect, RECONNECT_MS)
            }
            ws.onerror = (err) => {
                console.error('[WS] error', err)
                ws.close()
            }
        }

        connect()
        return () => {
            clearTimeout(timerRef.current)
            wsRef.current?.close()
        }
    }, [isToken])

    function removeToast(id) {
        setToasts(prev => prev.filter(t => t.id !== id))
    }

    const decrementPending = useCallback(() => {
        setPendingCount(c => Math.max(0, c - 1))
    }, [])

    return (
        <VerificationsContext.Provider value={{ pendingCount, toasts, removeToast, liveItems, decrementPending }}>
            {children}
        </VerificationsContext.Provider>
    )
}

export function useVerifications() {
    return useContext(VerificationsContext)
}
