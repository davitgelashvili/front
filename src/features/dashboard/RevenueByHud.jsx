import { Link } from 'react-router-dom'
import styles from './Stats.module.scss'
import { Section } from '@/components/Section/Section'

export const RevenueByHud = ({ items }) => {
    if (!items?.length) return null

    const maxRevenue = Math.max(...items.map(h => Number(h.revenue)))

    return (
        <Section title={"შემოსავალი HUD-ების მიხედვით"}>
            <div className={styles.hudRevenueWrap}>
                {items.map(h => {
                    const pct = maxRevenue > 0 ? (Number(h.revenue) / maxRevenue) * 100 : 0
                    return (
                        <div key={h.id} className={styles.hudRow}>
                            <div className={styles.hudLabel}>
                                <Link to={`/hud/${h.id}`} className={styles.hudLink}>{h.title}</Link>
                                <span className={styles.hudTickets}>{h.ticket_count} ბ.</span>
                            </div>
                            <div className={styles.hudBarWrap}>
                                <div className={styles.hudBar} style={{ width: `${pct}%` }} />
                            </div>
                            <span className={styles.hudRevNum}>₾{Number(h.revenue).toLocaleString('ka-GE')}</span>
                        </div>
                    )
                })}
            </div>
        </Section>
    )
}