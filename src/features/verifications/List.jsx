import { useEffect, useRef, useState } from 'react'
import useApi from '../../http/useApi'
import { useAuth } from '../../context/AuthContext'
import { useVerifications } from '../../context/VerificationsContext'
import styles from './styles.module.scss'

const STATUS = {
    pending:  { label: 'მომლოდინე',     cls: styles.sPending },
    verified: { label: 'ვერიფიცირებული', cls: styles.sVerified },
    rejected: { label: 'უარყოფილი',      cls: styles.sRejected },
}

function formatDate(d) {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('ka-GE', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function VerificationsList() {
    const { isToken, userRole } = useAuth()
    const { request } = useApi(isToken)
    const isAdmin = userRole === 'Admin'
    const prefix  = isAdmin ? '/dashboard' : '/panel'

    const [items, setItems]     = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter]   = useState('pending')
    const [saving, setSaving]   = useState(null)
    const { liveItems, decrementPending } = useVerifications()
    const seenIds = useRef(new Set())

    // inject live WS items when filter shows pending or all
    useEffect(() => {
        if (!liveItems.length) return
        const latest = liveItems[0]
        if (seenIds.current.has(latest.id)) return
        seenIds.current.add(latest.id)
        if (filter === 'pending' || filter === '') {
            setItems(prev => [latest, ...prev])
        }
    }, [liveItems])

    useEffect(() => { load() }, [isToken, filter])

    async function load() {
        setLoading(true)
        try {
            const url = `${prefix}/verifications${filter ? `?status=${filter}` : ''}`
            const res = await request({ url, method: 'GET' })
            if (res.success) setItems(res.verifications)
        } catch (err) { console.error(err) }
        finally { setLoading(false) }
    }

    async function updateStatus(id, status) {
        setSaving(id)
        try {
            const prev = items.find(v => v.id === id)
            await request({ url: `${prefix}/verification/${id}`, method: 'PUT', data: { status } })
            setItems(p => p.map(v => v.id === id ? { ...v, status } : v))
            if (prev?.status === 'pending') decrementPending()
        } catch (err) { console.error(err) }
        finally { setSaving(null) }
    }

    return (
        <div className="container">
            <div className={styles.topBar}>
                <h1 className={styles.pageTitle}>ვერიფიკაციები</h1>
                <div className={styles.filters}>
                    {['', 'pending', 'verified', 'rejected'].map(s => (
                        <button
                            key={s}
                            className={`${styles.filterBtn} ${filter === s ? styles.active : ''}`}
                            onClick={() => setFilter(s)}
                        >
                            {s === '' ? 'ყველა' : STATUS[s]?.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="box" style={{ padding: 0, overflow: 'hidden' }}>
                <div className={styles.tableHead}>
                    <span>მყიდველი</span>
                    <span>პ/ნ</span>
                    <span>HUD</span>
                    {isAdmin && <span>კლიენტი</span>}
                    <span>სტატუსი</span>
                    <span>თარიღი</span>
                    <span>მოქმედება</span>
                </div>

                {loading ? (
                    <div className={styles.empty}>იტვირთება...</div>
                ) : items.length === 0 ? (
                    <div className={styles.empty}>მოთხოვნები არ არის</div>
                ) : items.map(v => (
                    <div key={v.id} className={styles.row}>
                        <div className={styles.buyerCell}>
                            <div className={styles.avatar}>{(v.buyer_name || v.buyer_id || '?')[0].toUpperCase()}</div>
                            <div>
                                <p className={styles.buyerName}>{v.buyer_name || v.buyer_id}</p>
                                {v.buyer_phone && <p className={styles.buyerSub}>{v.buyer_phone}</p>}
                            </div>
                        </div>
                        <span className={styles.cell}>{v.buyer_personal_id || '—'}</span>
                        <span className={styles.cell}>{v.hud_title}</span>
                        {isAdmin && <span className={styles.cell} style={{ color: '#888' }}>{v.owner_name}</span>}
                        <span>
                            <span className={`${styles.badge} ${STATUS[v.status]?.cls}`}>
                                {STATUS[v.status]?.label}
                            </span>
                        </span>
                        <span className={styles.cell} style={{ color: '#aaa', fontSize: 12 }}>{formatDate(v.created_at)}</span>
                        <span className={styles.actions}>
                            {v.status !== 'verified' && (
                                <button
                                    className={`${styles.actionBtn} ${styles.approveBtn}`}
                                    onClick={() => updateStatus(v.id, 'verified')}
                                    disabled={saving === v.id}
                                >
                                    ✓ დადასტ.
                                </button>
                            )}
                            {v.status !== 'rejected' && (
                                <button
                                    className={`${styles.actionBtn} ${styles.rejectBtn}`}
                                    onClick={() => updateStatus(v.id, 'rejected')}
                                    disabled={saving === v.id}
                                >
                                    ✕ უარი
                                </button>
                            )}
                        </span>
                    </div>
                ))}
            </div>
            <p className={styles.count}>სულ: {items.length}</p>
        </div>
    )
}
