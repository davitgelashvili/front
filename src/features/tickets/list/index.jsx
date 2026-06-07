import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import QRCode from 'react-qr-code'
import useApi from '../../../http/useApi'
import { useAuth } from '../../../context/AuthContext'
import CustomButton from '../../../components/ui/CustomButton'
import InputText from '../../../components/ui/InputText'
import ExportButton from '../../../components/ui/ExportButton'
import DeleteButton from '../../../components/ui/DeleteButton'
import styles from './styles.module.scss'
import { useToast } from '../../../context/ToastContext'

const STATUS_CLS = {
    valid: styles.sValid,
    active: styles.sActive,
    validated: styles.sValidated,
    used: styles.sUsed,
    cancelled: styles.sCancelled,
}

const STATUS_LABELS = {
    '': 'ყველა სტატუსი',
    valid: 'valid',
    validated: 'validated',
    used: 'used',
    cancelled: 'cancelled',
}

function formatDate(d) {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('ka-GE', { day: 'numeric', month: 'short', year: 'numeric' })
}

export const ListTickets = () => {
    const { isToken, userRole } = useAuth()
    const { request } = useApi(isToken)
    const toast = useToast()
    const isAdmin = userRole === 'Admin'

    const [tickets, setTickets]       = useState([])
    const [loading, setLoading]       = useState(true)
    const [search, setSearch]         = useState('')
    const [statusFilter, setStatus]   = useState('')
    const [fromDate, setFromDate]     = useState('')
    const [toDate, setToDate]         = useState('')
    const [selected, setSelected]     = useState(new Set())
    const [bulkLoading, setBulkLoading] = useState(false)
    const [qrTicket, setQrTicket]     = useState(null)
    const [page, setPage]             = useState(1)
    const [total, setTotal]           = useState(0)
    const limit = 50
    const qrModalRef = useRef(null)

    useEffect(() => { setPage(1) }, [search, statusFilter, fromDate, toDate])
    useEffect(() => { load() }, [isToken, search, statusFilter, fromDate, toDate, page])

    // close QR modal on outside click
    useEffect(() => {
        function onKey(e) { if (e.key === 'Escape') setQrTicket(null) }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [])

    async function load() {
        setLoading(true)
        setSelected(new Set())
        try {
            const base = isAdmin ? '/dashboard/ticket' : '/panel/ticket'
            const params = new URLSearchParams()
            if (search)       params.set('search', search)
            if (statusFilter) params.set('status', statusFilter)
            if (fromDate)     params.set('from_date', fromDate)
            if (toDate)       params.set('to_date', toDate)
            params.set('page', page)
            params.set('limit', limit)
            const res = await request({ url: `${base}?${params}`, method: 'GET' })
            if (res.success) {
                setTickets(res.tickets)
                setTotal(res.total ?? res.tickets.length)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    function handleExport() {
        const headers = ['Ticket ID', 'HUD', 'Event', 'Batch', 'Price', 'Status', 'Owner', 'Sold At']
        const rows = tickets.map(t => [
            t.ticket_id, t.hud_title, t.event_title, t.batch_name, t.batch_price, t.status,
            t.owner_name || '', formatDate(t.sold_at),
        ])
        const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = 'tickets.csv'
        a.click()
        URL.revokeObjectURL(a.href)
    }

    const handleDelete = async (ticketId) => {
        if (!window.confirm('ნამდვილად წაშალო ეს ბილეთი?')) return
        try {
            await request({ url: `/dashboard/ticket/${ticketId}`, method: 'DELETE' })
            setTickets(prev => prev.filter(t => t.ticket_id !== ticketId))
            toast('ბილეთი წაიშალა', 'success')
        } catch (err) {
            console.error(err)
            toast('წაშლა ვერ მოხერხდა', 'error')
        }
    }

    function toggleSelect(id) {
        setSelected(prev => {
            const next = new Set(prev)
            next.has(id) ? next.delete(id) : next.add(id)
            return next
        })
    }

    function toggleAll() {
        if (selected.size === tickets.length) {
            setSelected(new Set())
        } else {
            setSelected(new Set(tickets.map(t => t.ticket_id)))
        }
    }

    async function bulkCancel() {
        if (!selected.size) return
        if (!window.confirm(`${selected.size} ბილეთი გაუქმდება. გაგრძელება?`)) return
        setBulkLoading(true)
        try {
            await request({
                url: '/dashboard/ticket/bulk',
                method: 'PUT',
                data: { ids: [...selected], status: 'cancelled' },
            })
            setTickets(prev =>
                prev.map(t => selected.has(t.ticket_id) ? { ...t, status: 'cancelled' } : t)
            )
            setSelected(new Set())
            toast(`${selected.size} ბილეთი გაუქმდა`, 'success')
        } catch (err) {
            console.error(err)
            toast('გაუქმება ვერ მოხერხდა', 'error')
        } finally {
            setBulkLoading(false)
        }
    }

    const cols = isAdmin
        ? '34px 1.2fr 1.2fr 1.2fr 1fr 90px 1fr 1fr 80px 70px'
        : '1.3fr 1.3fr 1.3fr 1.1fr 90px 1fr 80px'

    return (
        <div className="container">
            {/* Filter bar */}
            <div className={styles.filterBar}>
                <InputText
                    type="text"
                    value={search}
                    placeholder="ID, HUD, კლიენტი..."
                    onChange={e => setSearch(e.target.value)}
                />
                <select
                    className={styles.filterSelect}
                    value={statusFilter}
                    onChange={e => setStatus(e.target.value)}
                >
                    {Object.entries(STATUS_LABELS).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                    ))}
                </select>
                <input
                    className={styles.filterInput}
                    type="date"
                    value={fromDate}
                    onChange={e => setFromDate(e.target.value)}
                    title="დასაწყისი თარიღი"
                />
                <input
                    className={styles.filterInput}
                    type="date"
                    value={toDate}
                    onChange={e => setToDate(e.target.value)}
                    title="საბოლოო თარიღი"
                />
                <div className={styles.filterActions}>
                    {isAdmin && selected.size > 0 && (
                        <button
                            className={`${styles.filterBtn} ${styles.filterBtnCancel}`}
                            onClick={bulkCancel}
                            disabled={bulkLoading}
                        >
                            {bulkLoading ? '...' : `გაუქმება (${selected.size})`}
                        </button>
                    )}
                    {isAdmin && <ExportButton onClick={handleExport} />}
                    <CustomButton url="/tickets/add" style="dark">+ ბილეთის შექმნა</CustomButton>
                </div>
            </div>

            <div className="box" style={{ padding: 0, overflow: 'hidden' }}>
                <div className={styles.tableHead} style={{ gridTemplateColumns: cols }}>
                    {isAdmin && (
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                checked={tickets.length > 0 && selected.size === tickets.length}
                                onChange={toggleAll}
                                className={styles.checkbox}
                            />
                        </span>
                    )}
                    <span>Ticket ID</span>
                    <span>HUD</span>
                    <span>ივენთი</span>
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
                                    onChange={() => toggleSelect(t.ticket_id)}
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
                        <span className={styles.cell}>{t.event_title}</span>
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
                                <DeleteButton onClick={() => handleDelete(t.ticket_id)} />
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
        </div>
    )
}
