import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useApi from '../../http/useApi'
import { useAuth } from '../../context/AuthContext'
import ListItemCard from '../../components/ui/ListItemCard'
import CustomButton from '../../components/ui/CustomButton'
import styles from './Manage.module.scss'

export default function ClientManage() {
    const { user_id } = useParams()
    const [huds, setHuds]         = useState([])
    const [clientStats, setClientStats] = useState(null)
    const [client, setClient]     = useState(null)
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
        { label: 'HUD-ები',     value: clientStats.totalHuds },
        { label: 'ივენთები',    value: clientStats.totalEvents },
        { label: 'ბილეთები',   value: clientStats.totalTickets },
        { label: 'შემოსავალი', value: `₾${Number(clientStats.totalRevenue).toLocaleString('ka-GE')}` },
    ] : []

    return (
        <div className="container">
            {/* Client header */}
            {client && (
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div className={styles.avatar}>
                            {client.fullname.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                        </div>
                        <div>
                            <h2 className={styles.name}>{client.fullname}</h2>
                            <p className={styles.email}>{client.email}</p>
                        </div>
                    </div>
                    <CustomButton url={`/clients/${user_id}/hud/add`} style="dark">
                        + HUD
                    </CustomButton>
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
                                { label: 'Events', value: item.event_count },
                                { label: 'Batches', value: item.batch_count },
                            ]}
                            actions={[{ label: 'Manage', url: `/hud/${item.id}`, style: 'dark' }]}
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
