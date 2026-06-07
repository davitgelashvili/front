import { createContext, useCallback, useContext, useState } from 'react'
import styles from '../components/ui/Toast/styles.module.scss'

const ToastCtx = createContext(null)

let _id = 0

function ToastContainer({ toasts, onDismiss }) {
    if (!toasts.length) return null
    return (
        <div className={styles.wrap}>
            {toasts.map(t => (
                <div key={t.id} className={`${styles.toast} ${styles[t.type]}`}>
                    <span>{t.message}</span>
                    <button className={styles.close} onClick={() => onDismiss(t.id)}>✕</button>
                </div>
            ))}
        </div>
    )
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const show = useCallback((message, type = 'success') => {
        const id = ++_id
        setToasts(prev => [...prev, { id, message, type }])
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
    }, [])

    const dismiss = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    return (
        <ToastCtx.Provider value={show}>
            {children}
            <ToastContainer toasts={toasts} onDismiss={dismiss} />
        </ToastCtx.Provider>
    )
}

export const useToast = () => useContext(ToastCtx)
