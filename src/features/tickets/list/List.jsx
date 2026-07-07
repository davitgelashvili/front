import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import QRCode from 'react-qr-code'
import DeleteButton from '@/components/ui/DeleteButton'
import styles from './styles.module.scss'

const STATUS_CLS = {
    valid: styles.sValid,
    active: styles.sActive,
    validated: styles.sValidated,
    used: styles.sUsed,
    cancelled: styles.sCancelled,
}

function formatDate(d) {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('ka-GE', { day: 'numeric', month: 'short', year: 'numeric' })
}

export const List = ({
    tickets, loading, isAdmin,
    selected, onToggleSelect, onToggleAll, onDelete,
    page, setPage, total, limit,
}) => {
    const [qrTicket, setQrTicket] = useState(null)
    const qrModalRef = useRef(null)

    // close QR modal on Escape
    useEffect(() => {
        function onKey(e) { if (e.key === 'Escape') setQrTicket(null) }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [])

    const cols = isAdmin
        ? '34px 1.2fr 1.2fr 1.2fr 1fr 90px 1fr 1fr 80px 70px'
        : '1.3fr 1.3fr 1.3fr 1.1fr 90px 1fr 80px'

    return (
        <>
            <div className="box" style={{ padding: 0, overflow: 'hidden' }}>
                <div className={styles.tableHead} style={{ gridTemplateColumns: cols }}>
                    {isAdmin && (
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                checked={tickets.length > 0 && selected.size === tickets.length}
                                onChange={onToggleAll}
                                className={styles.checkbox}
                            />
                        </span>
                    )}
                    <span>Ticket ID</span>
                    <span>HUD</span>
                    <span>დღე</span>
                    <span>კალათა</span>
                    <span>სტატუსი</span>
                    <span>მყიდველი</span>
                    {isAdmin && <span>კლიენტი</span>}
                    <span>თარიღი</span>
                    {isAdmin && <span></span>}
                </div>

                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#aaa' }}>იტვირთება...</div>
                ) : tickets.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#aaa' }}>ბილეთები ვერ მოიძებნა</div>
                ) : tickets.map(t => (
                    <div
                        key={t.ticket_id}
                        className={`${styles.tableRow} ${selected.has(t.ticket_id) ? styles.rowSelected : ''}`}
                        style={{ gridTemplateColumns: cols }}
                    >
                        {isAdmin && (
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    checked={selected.has(t.ticket_id)}
                                    onChange={() => onToggleSelect(t.ticket_id)}
                                    className={styles.checkbox}
                                />
                            </span>
                        )}
                        <span className={styles.mono}>
                            <button
                                className={styles.qrBtn}
                                onClick={() => setQrTicket(t)}
                                title="QR კოდი"
                            >
                                {t.ticket_id}
                            </button>
                        </span>
                        <span className={styles.cell}>{t.hud_title}</span>
                        <span className={styles.cell}>{formatDate(t.event_date)}</span>
                        <span className={styles.cell}>{t.batch_name} · ₾{t.batch_price}</span>
                        <span>
                            <span className={`${styles.badge} ${STATUS_CLS[t.status] || styles.sActive}`}>
                                {t.status}
                            </span>
                        </span>
                        <span className={styles.cell}>
                            {t.buyer_id ? (
                                <Link to={`/buyers/${t.buyer_id}`} className={styles.buyerLink}>
                                    {t.buyer_id}
                                </Link>
                            ) : '—'}
                        </span>
                        {isAdmin && <span className={styles.cell} style={{ color: '#888' }}>{t.owner_name || '—'}</span>}
                        <span className={styles.cell} style={{ color: '#aaa', fontSize: 12 }}>{formatDate(t.sold_at)}</span>
                        {isAdmin && (
                            <span className={styles.actions}>
                                <Link to={`/tickets/${t.ticket_id}/edit`} className={styles.editLink}>Edit</Link>
                                <DeleteButton onClick={() => onDelete(t.ticket_id)} />
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, fontSize: 13, color: '#aaa' }}>
                <span>სულ: {total} ბილეთი</span>
                {total > limit && (
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                            style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #e5e7eb', cursor: 'pointer', background: page === 1 ? '#f9fafb' : '#fff' }}>
                            ←
                        </button>
                        <span style={{ color: '#374151' }}>{page} / {Math.ceil(total / limit)}</span>
                        <button onClick={() => setPage(p => p + 1)} disabled={page >= Math.ceil(total / limit)}
                            style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #e5e7eb', cursor: 'pointer', background: page >= Math.ceil(total / limit) ? '#f9fafb' : '#fff' }}>
                            →
                        </button>
                    </div>
                )}
            </div>

            {/* QR Modal */}
            {qrTicket && (
                <div className={styles.modalOverlay} onClick={() => setQrTicket(null)} ref={qrModalRef}>
                    <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
                        <button className={styles.modalClose} onClick={() => setQrTicket(null)}>✕</button>
                        <p className={styles.modalTitle}>{qrTicket.hud_title}</p>
                        <p className={styles.modalSub}>{qrTicket.event_title} · {qrTicket.batch_name}</p>
                        <div className={styles.qrWrap}>
                            <QRCode value={qrTicket.ticket_id} size={200} />
                        </div>
                        <p className={styles.modalId}>{qrTicket.ticket_id}</p>
                        <span className={`${styles.badge} ${STATUS_CLS[qrTicket.status] || styles.sActive}`}>
                            {qrTicket.status}
                        </span>
                    </div>
                </div>
            )}
        </>
    )
}
