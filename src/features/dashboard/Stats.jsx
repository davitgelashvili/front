import React, { useEffect, useState } from 'react'
import useApi from '../../http/useApi'
import { useAuth } from '../../context/AuthContext'
import styles from './Stats.module.scss'

export const Stats = () => {
    const [stats, setStats] = useState(null)
    const { isToken } = useAuth()
    const { request } = useApi(isToken)

    useEffect(() => {
        async function loadStats() {
            try {
                const response = await request({
                    url: '/dashboard/stats',
                    method: 'GET'
                })
                if (response.success) {
                    setStats(response.stats)
                }
            } catch (error) {
                console.error('Error loading stats:', error)
            }
        }
        loadStats()
    }, [isToken])

    if (!stats) {
        return <div className="container">Loading statistics...</div>
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2 className={styles.title}>Dashboard Statistics</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-6 col-md-3">
                    <div className={styles.statCard}>
                        <div className={styles.statNumber}>{stats.totalHuds}</div>
                        <div className={styles.statLabel}>Total HUDs</div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className={styles.statCard}>
                        <div className={styles.statNumber}>{stats.totalEvents}</div>
                        <div className={styles.statLabel}>Total Events</div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className={styles.statCard}>
                        <div className={styles.statNumber}>{stats.totalBatches}</div>
                        <div className={styles.statLabel}>Total Batches</div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className={styles.statCard}>
                        <div className={styles.statNumber}>{stats.totalTickets}</div>
                        <div className={styles.statLabel}>Tickets Sold</div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className={styles.statCard}>
                        <div className={styles.statNumber}>₾{stats.totalRevenue}</div>
                        <div className={styles.statLabel}>Total Revenue</div>
                    </div>
                </div>
            </div>
        </div>
    )
}