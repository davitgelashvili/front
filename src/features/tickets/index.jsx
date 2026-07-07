import { useEffect, useState } from 'react'
import useApi from '@/http/useApi'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import CustomButton from '@/components/ui/CustomButton/CustomButton'
import { Section } from '@/components/Section/Section'
import { FilterBar } from './list/FilterBar'
import { List } from './list/List'
import SectionMenu from '@/components/SectionMenu'

export { AddTicket } from './add'
export { default as EditTicket } from './edit'
export { default as ValidateTicket } from './validate'

function formatDate(d) {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('ka-GE', { day: 'numeric', month: 'short', year: 'numeric' })
}

const FILTER_OPTIONS = [
    { value: '', label: 'ყველა' },
    { value: 'valid', label: 'valid' },
    { value: 'validated', label: 'validated' },
    { value: 'used', label: 'used' },
    { value: 'cancelled', label: 'cancelled' },
]

export const Tickets = () => {
    const { isToken, userRole } = useAuth()
    const { request } = useApi(isToken)
    const toast = useToast()
    const isAdmin = userRole === 'Admin'

    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatus] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [selected, setSelected] = useState(new Set())
    const [bulkLoading, setBulkLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const limit = 50

    useEffect(() => { setPage(1) }, [search, statusFilter, fromDate, toDate])
    useEffect(() => { load() }, [isToken, search, statusFilter, fromDate, toDate, page])

    async function load() {
        setLoading(true)
        setSelected(new Set())
        try {
            const base = isAdmin ? '/dashboard/ticket' : '/panel/ticket'
            const params = new URLSearchParams()
            if (search) params.set('search', search)
            if (statusFilter) params.set('status', statusFilter)
            if (fromDate) params.set('from_date', fromDate)
            if (toDate) params.set('to_date', toDate)
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

    return (
        <div className="container">
            <Section
                title={'ბილეთები'}
                elements={<>
                    <div className='col-auto'>
                        <SectionMenu options={FILTER_OPTIONS} value={statusFilter} onChange={setStatus} />
                    </div>
                    <div className='col-auto'>
                        <CustomButton url="/tickets/add" style="dark">Create Ticket</CustomButton>
                    </div>
                </>}>
                <FilterBar
                    search={search} setSearch={setSearch}
                    fromDate={fromDate} setFromDate={setFromDate}
                    toDate={toDate} setToDate={setToDate}
                    isAdmin={isAdmin}
                    selectedCount={selected.size}
                    bulkLoading={bulkLoading}
                    onBulkCancel={bulkCancel}
                    onExport={handleExport}
                />
                <List
                    tickets={tickets}
                    loading={loading}
                    isAdmin={isAdmin}
                    selected={selected}
                    onToggleSelect={toggleSelect}
                    onToggleAll={toggleAll}
                    onDelete={handleDelete}
                    page={page} setPage={setPage}
                    total={total} limit={limit}
                />
            </Section>
        </div>
    )
}
