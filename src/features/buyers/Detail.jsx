import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useApi from '../../http/useApi'
import { useAuth } from '../../context/AuthContext'
import styles from './styles.module.scss'

const STATUS_CLS = {
    active: styles.sActive, valid: styles.sActive,
    validated: styles.sValidated, used: styles.sUsed, cancelled: styles.sCancelled,
}

function formatDate(d) {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('ka-GE', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function BuyerDetail() {
    const { id } = useParams()
    const { isToken, userRole } = useAuth()
    const { request } = useApi(isToken)
    const [buyer, setBuyer] = useState(null)
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const isAdmin = userRole === 'Admin'
    const prefix = isAdmin ? '/dashboard' : '/panel'

    useEffect(() => {
        async function load() {
            try {
                const res = await request({ url: `${prefix}/buyer/${encodeURIComponent(id)}`, method: 'GET' })
                if (res.success) { setBuyer(res.buyer); setTickets(res.tickets) }
            } catch (err) { console.error(err) }
            finally { setLoading(false) }
        }
        load()
    }, [isToken, id])

    if (loading) return <div className="container" style={{ paddingTop: 60, textAlign: 'center', color: '#aaa' }}>იტვირთება...</div>
    if (!buyer) return <div className="container" style={{ paddingTop: 60, textAlign: 'center', color: '#c62828' }}>მყიდველი ვერ მოიძებნა</div>

    return (
        <div className="container">
            <div className={styles.breadcrumb}>
                <Link to="/buyers" className={styles.backLink}>← მყიდველები</Link>
                {isAdmin && (
                    <Link to={`/buyers/${id}/edit`} className={styles.editLink}>რედაქტირება</Link>
                )}
            </div>

            <div className={`box ${styles.buyerCard}`}>
                <div className={styles.buyerCardLeft}>
                    <div className={styles.avatarLg}>{buyer.name[0]?.toUpperCase()}</div>
                    <div>
                        <h2 className={styles.buyerCardName}>{buyer.name}</h2>
                        <p className={styles.buyerCardId}>{buyer.id}</p>
                        <div className={styles.infoRows}>
                            {buyer.personal_id && <p>🪪 {buyer.personal_id}</p>}
                            {buyer.phone       && <p>📞 {buyer.phone}</p>}
                            {buyer.email       && <p>✉️ {buyer.email}</p>}
                            {buyer.notes       && <p style={{ color: '#888', fontStyle: 'italic' }}>{buyer.notes}</p>}
                        </div>
                    </div>
                </div>

                <div className={styles.buyerCardStats}>
                    <div className={styles.statBox}>
                        <p className={styles.statVal}>{buyer.ticket_count}</p>
                        <p className={styles.statLabel}>ბილეთი</p>
                    </div>
                    <div className={styles.statBox}>
                        <p className={styles.statVal}>₾{Number(buyer.total_spent || 0).toLocaleString('ka-GE')}</p>
                        <p className={styles.statLabel}>დახარჯული</p>
                    </div>
                    <div className={styles.statBox}>
                        <p className={styles.statVal} style={{ fontSize: 13 }}>{formatDate(buyer.first_purchase)}</p>
                        <p className={styles.statLabel}>პირველი ყიდვა</p>
                    </div>
                </div>
            </div>

            <h3 className={styles.sectionTitle}>ბილეთები ({tickets.length})</h3>
            <div className="box" style={{ padding: 0, overflow: 'hidden' }}>
                <div className={styles.tHead}>
                    <span>Ticket ID</span>
                    <span>შოუ</span>
                    <span>ივენთი</span>
                    <span>კალათა</span>
                    <span>სტატუსი</span>
                    <span>პლატფ.</span>
                    <span>თარიღი</span>
                </div>
                {tickets.length === 0 ? (
                    <div className={styles.empty}>ბილეთები არ არის</div>
                ) : tickets.map(t => (
                    <div key={t.ticket_id} className={styles.tRow}>
                        <span className={styles.mono}>{t.ticket_id}</span>
                        <span className={styles.cell}>{t.hud_title}</span>
                        <span className={styles.cell}>{t.event_title}</span>
                        <span className={styles.cell}>{t.batch_name} · ₾{t.batch_price}</span>
                        <span><span className={`${styles.badge} ${STATUS_CLS[t.status] || styles.sActive}`}>{t.status}</span></span>
                        <span className={styles.cell} style={{ color: '#aaa', fontSize: 12 }}>{t.platform}</span>
                        <span className={styles.cell} style={{ color: '#aaa', fontSize: 12 }}>{formatDate(t.sold_at)}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
