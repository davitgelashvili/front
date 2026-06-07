import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import QRCode from 'react-qr-code'
import { testApi } from '../http/api'
import { useTestUser } from '../context/UserContext'
import styles from './EventDetail.module.scss'

function formatDate(d) {
    if (!d) return ''
    return new Date(d).toLocaleDateString('ka-GE', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    })
}

function TicketCard({ ticket, onClose }) {
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.ticketCard} onClick={e => e.stopPropagation()}>
                <div className={styles.tcHeader}>
                    <span className={styles.tcBadge}>✅ ბილეთი შეძენილია</span>
                    <button className={styles.tcClose} onClick={onClose}>✕</button>
                </div>
                <div className={styles.tcBody}>
                    <p className={styles.tcShow}>{ticket.showName}</p>
                    <p className={styles.tcEvent}>{ticket.eventName}</p>
                    <p className={styles.tcDate}>{formatDate(ticket.eventDate)}</p>
                    <div className={styles.tcDivider} />
                    <div className={styles.tcRow}>
                        <span>კატეგორია</span><strong>{ticket.batchName}</strong>
                    </div>
                    <div className={styles.tcRow}>
                        <span>მომხმარებელი</span><strong>{ticket.userName}</strong>
                    </div>
                    <div className={styles.tcRow}>
                        <span>ფასი</span><strong>{ticket.price} ₾</strong>
                    </div>
                    <div className={styles.tcRow}>
                        <span>სტატუსი</span>
                        <strong className={styles.tcActive}>● აქტიური</strong>
                    </div>
                    <div className={styles.tcQr}>
                        <QRCode value={ticket.ticketId} size={140} />
                    </div>
                    <div className={styles.tcId}>#{ticket.ticketId}</div>
                </div>
            </div>
        </div>
    )
}

const VER_LABEL = {
    pending:  { text: '⏳ მომლოდინე',     cls: styles.verPending },
    verified: { text: '✅ ვერიფიცირებული', cls: styles.verVerified },
    rejected: { text: '❌ უარყოფილი',      cls: styles.verRejected },
}

export default function EventDetail() {
    const { id } = useParams()
    const { activeUser, updateCoins } = useTestUser()
    const [event, setEvent]         = useState(null)
    const [loading, setLoading]     = useState(true)
    const [buying, setBuying]       = useState(null)
    const [error, setError]         = useState('')
    const [ticket, setTicket]       = useState(null)
    const [verStatus, setVerStatus] = useState(null)   // null | 'pending' | 'verified' | 'rejected'
    const [verLoading, setVerLoading] = useState(false)

    useEffect(() => {
        testApi.event(id)
            .then(r => setEvent(r.data.event))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [id])

    useEffect(() => {
        if (!event?.requiresVerification || !activeUser) return
        testApi.verificationStatus(event.showId, activeUser.id)
            .then(r => setVerStatus(r.data.verification?.status || null))
            .catch(console.error)
    }, [event, activeUser])

    async function handleVerify() {
        if (!activeUser || !event) return
        setVerLoading(true)
        setError('')
        try {
            const res = await testApi.verifyRequest(event.showId, activeUser.id)
            setVerStatus(res.data.status)
        } catch (err) {
            setError(err.response?.data?.message || 'შეცდომა')
        } finally {
            setVerLoading(false)
        }
    }

    async function handleBuy(tt) {
        if (!activeUser) return
        setBuying(tt.id)
        setError('')
        try {
            const res = await testApi.buy(tt.id, activeUser.id)
            updateCoins(activeUser.id, res.data.coins)
            setTicket(res.data.ticket)
            const updated = await testApi.event(id)
            setEvent(updated.data.event)
        } catch (err) {
            setError(err.response?.data?.message || 'შეცდომა')
        } finally {
            setBuying(null)
        }
    }

    if (loading) return <div className={styles.center}>იტვირთება...</div>
    if (!event)  return <div className={styles.center}>სეანსი ვერ მოიძებნა</div>

    return (
        <div className={styles.page}>
            {ticket && <TicketCard ticket={ticket} onClose={() => setTicket(null)} />}

            <Link to={`/test/show/${event.showId}`} className={styles.back}>← {event.showName}</Link>

            <div className={styles.hero}>
                {event.showCover && <img src={event.showCover} alt={event.showName} className={styles.cover} />}
                <div>
                    <h1 className={styles.name}>{event.showName}</h1>
                    <p className={styles.date}>{formatDate(event.date)}</p>
                    {activeUser && (
                        <p className={styles.userInfo}>
                            <span className={styles.userBadge}>
                                {activeUser.is_valid ? '✅' : '❌'} {activeUser.name}
                            </span>
                            <span className={styles.personalId}>პ/ნ: {activeUser.personal_id}</span>
                            <span className={styles.coins}>🪙 {activeUser.coins}</span>
                        </p>
                    )}
                </div>
            </div>

            {error && <div className={styles.errorBanner}>{error}</div>}

            {/* ვერიფიკაცია */}
            {event.requiresVerification && activeUser && (
                <div className={styles.verBox}>
                    <span className={styles.verTitle}>🔒 ამ შოუს ვერიფიკაცია სჭირდება</span>
                    {verStatus ? (
                        <span className={`${styles.verBadge} ${VER_LABEL[verStatus]?.cls}`}>
                            {VER_LABEL[verStatus]?.text}
                        </span>
                    ) : (
                        <button
                            className={styles.verBtn}
                            onClick={handleVerify}
                            disabled={verLoading}
                        >
                            {verLoading ? '...' : 'ვერიფიკაციის მოთხოვნა'}
                        </button>
                    )}
                </div>
            )}

            <h2 className={styles.sectionTitle}>ბილეთები</h2>
            <div className={styles.ticketList}>
                {event.ticketTypes?.map(tt => {
                    const notEnough   = activeUser && activeUser.coins < tt.price
                    const needsVer    = event.requiresVerification && verStatus !== 'verified'
                    const isInactive  = !!tt.isInactive
                    const btnDisabled = isInactive || tt.isSoldOut || buying === tt.id || notEnough || needsVer

                    const btnLabel = buying === tt.id ? '...'
                        : isInactive    ? 'მიუწვდომელია'
                        : tt.isSoldOut  ? 'გაყიდულია'
                        : notEnough     ? 'არ გყოფნის'
                        : needsVer      ? '🔒 ვერიფ. სჭირდება'
                        : 'შეძენა'

                    return (
                        <div
                            key={tt.id}
                            className={`${styles.ticketRow} ${tt.isSoldOut ? styles.soldOut : ''} ${isInactive ? styles.inactive : ''}`}
                        >
                            <div className={styles.ticketInfo}>
                                <span className={styles.ticketName}>
                                    {isInactive && <span style={{ marginRight: 6 }}>🔒</span>}
                                    {tt.name}
                                </span>
                                <span className={styles.ticketAvail}>
                                    {isInactive    ? 'გათიშულია'
                                    : tt.isSoldOut ? 'გაყიდულია'
                                    : `${tt.available} ადგილი დარჩა`}
                                </span>
                            </div>
                            <div className={styles.ticketRight}>
                                <span className={styles.ticketPrice}>{tt.price} ₾</span>
                                <button
                                    className={styles.buyBtn}
                                    disabled={btnDisabled}
                                    onClick={() => handleBuy(tt)}
                                >
                                    {btnLabel}
                                </button>
                            </div>
                        </div>
                    )
                })}
                {!event.ticketTypes?.length && <p className={styles.empty}>ბილეთები არ არის</p>}
            </div>
        </div>
    )
}
