import { useEffect, useState } from 'react'
import useApi from '@/http/useApi'
import { useAuth } from '@/context/AuthContext'
import Loader from '@/components/ui/Loader/Loader'
import styles from './Stats.module.scss'
import { StatsCards } from './StatsCards'
import { RevenueByHud } from './RevenueByHud'
import { RecentTickets } from './RecentTickets'

export const Dashboard = () => {
    const [stats, setStats] = useState(null)
    const [recent, setRecent] = useState([])
    const [revenueByHud, setRevHud] = useState([])
    const { isToken, userRole } = useAuth()
    const { request } = useApi(isToken)
    const isAdmin = userRole === 'Admin'
    const url = isAdmin ? '/dashboard/stats' : '/panel/stats'

    useEffect(() => {
        async function load() {
            try {
                const res = await request({ url, method: 'GET' })
                if (res.success) {
                    setStats(res.stats)
                    if (res.recentTickets) setRecent(res.recentTickets)
                    if (res.revenueByHud) setRevHud(res.revenueByHud)
                }
            } catch { }
        }
        load()
    }, [isToken])

    if (!stats) {
        return (
            <div className="container" style={{ paddingTop: 60, textAlign: 'center' }}>
                <Loader size={48} color="blue" />
            </div>
        )
    }

    return (
        <div className="container">
            <div className={styles.wrap}>
                <StatsCards stats={stats} isAdmin={isAdmin} />
                <RevenueByHud items={revenueByHud} />
                <RecentTickets items={recent} isAdmin={isAdmin} />
            </div>
        </div>
    )
}
