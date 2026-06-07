import ListItemCard from "../../../components/ui/ListItemCard";
import useApi from "../../../http/useApi";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import CustomButton from "../../../components/ui/CustomButton";
import InputText from "../../../components/ui/InputText";
import styles from "./styles.module.scss";
import { useToast } from "../../../context/ToastContext";

export default function HudList() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const { isToken, userRole } = useAuth()
    const { request } = useApi(isToken)
    const toast = useToast()
    const prefix = userRole === 'Admin' ? '/dashboard' : '/panel'

    useEffect(() => {
        async function load() {
            try {
                const res = await request({ url: `${prefix}/hud`, method: 'GET' })
                if (res.success) setData(res.items)
            } catch (err) { console.error(err) }
        }
        load()
    }, [isToken])

    const handleDeleteHud = async (hudId) => {
        if (!window.confirm('ნამდვილად წაშალო ეს HUD?')) return
        try {
            await request({ url: `${prefix}/hud/${hudId}`, method: 'DELETE' })
            setData(prev => prev.filter(h => h.id !== hudId))
            toast('HUD წაიშალა', 'success')
        } catch (err) {
            console.error(err)
            toast('წაშლა ვერ მოხერხდა', 'error')
        }
    }

    const handleStatus = async (hudId, status) => {
        try {
            await request({ url: `/dashboard/hud/${hudId}/status`, method: 'PATCH', data: { status } })
            setData(prev => prev.map(h => h.id === hudId ? { ...h, status } : h))
            toast('სტატუსი განახლდა', 'success')
        } catch (err) {
            console.error(err)
            toast('სტატუსის შეცვლა ვერ მოხერხდა', 'error')
        }
    }

    const filtered = data.filter(item =>
        !search ||
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="container">
            {/* Filter bar */}
            <div className={`${styles.filterBar} d-flex align-items-center justify-content-between`}>
                <InputText
                    type="text"
                    value={search}
                    placeholder="სახელით ძებნა..."
                    onChange={e => setSearch(e.target.value)}
                />
                <div className={styles.filterActions}>
                    <CustomButton url={userRole === 'Admin' ? '/clients' : 'add'} style="dark">
                        Create Hud
                    </CustomButton>
                </div>
            </div>

            <div className="row">
                {filtered.map(item => (
                    <div className="col-4" key={item.id}>
                        <ListItemCard
                            cover={item.cover}
                            title={item.title}
                            description={item.description}
                            date={{ start: item.start_datetime, end: item.end_datetime }}
                            status={item.status}
                            stats={[
                                { label: 'Events', value: item.event_count },
                                { label: 'Batches', value: item.batch_count },
                            ]}
                            statusActions={userRole === 'Admin' ? [
                                item.status !== 'published' && { label: '✓ გამოქვეყნება', onClick: () => handleStatus(item.id, 'published'), bg: '#f0fdf4', color: '#16a34a' },
                                item.status !== 'rejected'  && { label: '✕ უარყოფა',      onClick: () => handleStatus(item.id, 'rejected'),  bg: '#fef2f2', color: '#dc2626' },
                                item.status !== 'archived'  && { label: '📦 არქივი',       onClick: () => handleStatus(item.id, 'archived'),  bg: '#f9fafb', color: '#6b7280' },
                            ].filter(Boolean) : []}
                            actions={[{ label: 'Manage', url: String(item.id), style: 'dark' }]}
                            onDelete={() => handleDeleteHud(item.id)}
                        />
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div className="col-12" style={{ padding: '40px', textAlign: 'center', color: '#aaa' }}>
                        HUD ვერ მოიძებნა
                    </div>
                )}
            </div>
        </div>
    )
}
