import { useEffect, useRef, useState } from 'react'
import useApi from '@/http/useApi'
import { useAuth } from '@/context/AuthContext'
import { useVerifications } from '@/context/VerificationsContext'
import { Section } from '@/components/Section/Section'
import SectionMenu from '@/components/SectionMenu'
import { List, STATUS } from './List'

const FILTER_OPTIONS = [
    { value: '', label: 'ყველა' },
    { value: 'pending', label: STATUS.pending.label },
    { value: 'verified', label: STATUS.verified.label },
    { value: 'rejected', label: STATUS.rejected.label },
]

export const Verifications = () => {
    const { isToken, userRole } = useAuth()
    const { request } = useApi(isToken)
    const isAdmin = userRole === 'Admin'
    const prefix  = isAdmin ? '/dashboard' : '/panel'

    const [items, setItems]     = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter]   = useState('')
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
            <Section
                title={'ვერიფიკაციები'}
                elements={<>
                    <div className='col-auto'>
                        <SectionMenu options={FILTER_OPTIONS} value={filter} onChange={setFilter} />
                    </div>
                </>}>
                <List
                    items={items}
                    loading={loading}
                    isAdmin={isAdmin}
                    saving={saving}
                    onUpdateStatus={updateStatus}
                />
            </Section>
        </div>
    )
}
