import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useApi from '@/http/useApi'
import { useAuth } from '@/context/AuthContext'
import ListItemCard from '@/components/ui/ListItemCard/ListItemCard'
import CustomButton from '@/components/ui/CustomButton/CustomButton'
import styles from './Manage.module.scss'

export default function ClientManage() {
    const { user_id } = useParams()
    const [huds, setHuds] = useState([])
    const [clientStats, setClientStats] = useState(null)
    const [client, setClient] = useState(null)
    const { isToken } = useAuth()
    const { request } = useApi(isToken)

    useEffect(() => {
        async function load() {
            try {
                const [hudsRes, statsRes] = await Promise.all([
                    request({ url: `/dashboard/hud?user_id=${user_id}`, method: 'GET' }),
                    request({ url: `/dashboard/user/${user_id}/stats`, method: 'GET' }),
                ])
                if (hudsRes.success) setHuds(hudsRes.items)
                if (statsRes.success) {
                    setClientStats(statsRes.stats)
                    setClient(statsRes.user)
                }
            } catch (err) {
                console.error(err)
            }
        }
        load()
    }, [isToken, user_id])

    const STAT_ITEMS = clientStats ? [
        { label: 'Events', value: clientStats.totalHuds },
        { label: 'Days', value: clientStats.totalEvents },
        { label: 'Batches', value: clientStats.totalTickets },
        { label: 'Cash income', value: `₾${Number(clientStats.totalRevenue).toLocaleString('ka-GE')}` },
    ] : []

    return (
        <div className="container">
            {/* Client header */}
            {client && (
                <div className={styles.header}>
                    <div className='row'>
                        <div className='col'>
                            <div className={styles.headerLeft}>
                                <div className={styles.avatar}>
                                    {client.fullname.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                                </div>
                                <div>
                                    <h2 className={styles.name}>{client.fullname}</h2>
                                    <p className={styles.email}>{client.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-auto'>
                            <CustomButton url={`/clients/${user_id}/hud/add`} style="dark">
                                Create Event
                            </CustomButton>
                        </div>
                    </div>
                </div>
            )}

            {/* Stats row */}
            {STAT_ITEMS.length > 0 && (
                <div className={styles.statsRow}>
                    {STAT_ITEMS.map(s => (
                        <div key={s.label} className={styles.statCard}>
                            <p className={styles.statVal}>{s.value}</p>
                            <p className={styles.statLabel}>{s.label}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* HUDs grid */}
            <div className="row">
                {huds.map(item => (
                    <div className="col-4" key={item.id}>
                        <ListItemCard
                            cover={item.cover}
                            title={item.title}
                            description={item.description}
                            date={{ start: item.start_datetime, end: item.end_datetime }}
                            stats={[
                                { label: 'Days', value: item.event_count },
                                { label: 'Batches', value: item.batch_count },
                            ]}
                            actions={[
                                { label: 'Edit', url: `/hud/${item.id}/edit`, style: 'light' },
                                { label: 'Manage', url: `/hud/${item.id}`, style: 'dark' },
                            ]}
                            onDelete={async () => {
                                if (!window.confirm('ნამდვილად წაშალო ეს HUD?')) return
                                try {
                                    await request({ url: `/dashboard/hud/${item.id}`, method: 'DELETE' })
                                    setHuds(prev => prev.filter(h => h.id !== item.id))
                                } catch (err) {
                                    console.error(err)
                                }
                            }}
                        />
                    </div>
                ))}
            </div>

            {huds.length === 0 && client && (
                <p style={{ color: '#aaa', marginTop: 20 }}>ამ კლიენტს HUD-ები არ აქვს.</p>
            )}
        </div>
    )
}
