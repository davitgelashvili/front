import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import QRCode from 'react-qr-code'
import { testApi } from '../http/api'
import styles from './MyTickets.module.scss'

function formatDate(d) {
    if (!d) return ''
    return new Date(d).toLocaleDateString('ka-GE', {
        day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    })
}

const STATUS_LABEL = {
    active:    { label: 'აქტიური',     cls: 'active' },
    validated: { label: 'სკანირებული', cls: 'validated' },
    used:      { label: 'გამოყენებული', cls: 'used' },
}

export default function MyTickets() {
    const { userId } = useParams()
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!userId) return
        testApi.tickets(userId)
            .then(r => setTickets(r.data.tickets))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [userId])

    if (loading) return <div className={styles.center}>იტვირთება...</div>

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>ჩემი ბილეთები</h1>
                <Link to="/test" className={styles.backLink}>← შოუების სია</Link>
            </div>

            {tickets.length === 0 ? (
                <div className={styles.empty}>
                    <p>ბილეთები ჯერ არ გაქვს</p>
                    <Link to="/test" className={styles.browseBtn}>შოუების ნახვა</Link>
                </div>
            ) : (
                <div className={styles.list}>
                    {tickets.map((t, i) => {
                        const st = STATUS_LABEL[t.status] || { label: t.status, cls: 'active' }
                        return (
                            <div key={i} className={styles.ticket}>
                                {t.showCover && <img src={t.showCover} alt={t.showName} className={styles.cover} />}
                                <div className={styles.info}>
                                    <p className={styles.showName}>{t.showName}</p>
                                    <p className={styles.eventName}>{t.eventName}</p>
                                    <p className={styles.eventDate}>{formatDate(t.eventDate)}</p>
                                    <p className={styles.batch}>{t.batchName}</p>
                                    <span className={`${styles.status} ${styles[st.cls]}`}>{st.label}</span>
                                </div>
                                <div className={styles.right}>
                                    <div className={styles.qr}>
                                        <QRCode value={t.ticketId} size={90} />
                                    </div>
                                    <span className={styles.price}>{t.price} ₾</span>
                                    <span className={styles.ticketId}>#{t.ticketId}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
