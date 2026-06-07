import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useApi from '../../../http/useApi'
import { useAuth } from '../../../context/AuthContext'
import InputText from '../../../components/ui/InputText'
import ExportButton from '../../../components/ui/ExportButton'

const STATUS_LABELS = { '': 'ყველა', valid: 'valid', validated: 'validated', used: 'used', cancelled: 'cancelled' }
const STATUS_COLOR  = { valid: '#16a34a', validated: '#1d4ed8', used: '#6b7280', cancelled: '#dc2626' }

function formatDate(d) {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('ka-GE', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function AttendeeList() {
    const { event_id } = useParams()
    const { isToken, userRole } = useAuth()
    const { request } = useApi(isToken)
    const prefix = userRole === 'Admin' ? '/dashboard' : '/panel'

    const [tickets, setTickets] = useState([])
    const [total, setTotal]     = useState(0)
    const [loading, setLoading] = useState(true)
    const [search, setSearch]   = useState('')
    const [status, setStatus]   = useState('')
    const [page, setPage]       = useState(1)
    const limit = 50

    useEffect(() => { setPage(1) }, [search, status])
    useEffect(() => { load() }, [isToken, event_id, search, status, page])

    async function load() {
        setLoading(true)
        try {
            const params = new URLSearchParams({ page, limit })
            if (search) params.set('search', search)
            if (status) params.set('status', status)
            const res = await request({ url: `${prefix}/event/${event_id}/tickets?${params}`, method: 'GET' })
            if (res.success) {
                setTickets(res.tickets)
                setTotal(res.total ?? res.tickets.length)
            }
        } catch (err) { console.error(err) }
        finally { setLoading(false) }
    }

    function handleExport() {
        const headers = ['Ticket ID', 'Batch', 'Price', 'Buyer ID', 'Status', 'Platform', 'Sold At']
        const rows = tickets.map(t => [t.ticket_id, t.batch_name, t.batch_price, t.buyer_id || '', t.status, t.platform || '', formatDate(t.sold_at)])
        const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = `attendees-${event_id}.csv`
        a.click()
        URL.revokeObjectURL(a.href)
    }

    const totalPages = Math.ceil(total / limit)

    return (
        <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h2 style={{ margin: 0 }}>დამსწრეთა სია ({total})</h2>
                <ExportButton onClick={handleExport} />
            </div>

            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                <InputText type="text" value={search} placeholder="Ticket ID ან Buyer ID..." onChange={e => setSearch(e.target.value)} />
                <select value={status} onChange={e => setStatus(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 14 }}>
                    {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
            </div>

            <div className="box" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 80px 1fr 90px 80px', padding: '10px 16px', background: '#f9fafb', fontSize: 12, fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #f0f0f0' }}>
                    <span>Ticket ID</span><span>კალათა</span><span>ფასი</span><span>Buyer</span><span>სტატუსი</span><span>თარიღი</span>
                </div>

                {loading ? (
                    <div style={{ padding: 40, textAlign: 'center', color: '#aaa' }}>იტვირთება...</div>
                ) : tickets.length === 0 ? (
                    <div style={{ padding: 40, textAlign: 'center', color: '#aaa' }}>ბილეთები ვერ მოიძებნა</div>
                ) : tickets.map(t => (
                    <div key={t.ticket_id} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 80px 1fr 90px 80px', padding: '10px 16px', borderBottom: '1px solid #f9fafb', fontSize: 13, alignItems: 'center' }}>
                        <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{t.ticket_id}</span>
                        <span>{t.batch_name}</span>
                        <span style={{ fontWeight: 600 }}>₾{t.batch_price}</span>
                        <span style={{ color: '#888' }}>{t.buyer_id || '—'}</span>
                        <span>
                            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 12, background: `${STATUS_COLOR[t.status]}18`, color: STATUS_COLOR[t.status] || '#374151', fontWeight: 600 }}>
                                {t.status}
                            </span>
                        </span>
                        <span style={{ color: '#aaa', fontSize: 11 }}>{formatDate(t.sold_at)}</span>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, fontSize: 13, color: '#aaa' }}>
                <span>გვერდი {page} / {totalPages || 1}</span>
                {totalPages > 1 && (
                    <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                            style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #e5e7eb', cursor: 'pointer' }}>←</button>
                        <button onClick={() => setPage(p => p + 1)} disabled={page >= totalPages}
                            style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #e5e7eb', cursor: 'pointer' }}>→</button>
                    </div>
                )}
            </div>
        </div>
    )
}
