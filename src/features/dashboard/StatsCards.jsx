import styles from './Stats.module.scss'
import { Section } from '@/components/Section/Section'
import { UsersIcon, HudIcon, CalendarIcon, BasketIcon, TicketIcon, RevenueIcon } from './icons'

const CARDS = [
    { key: 'totalUsers', label: 'კლიენტები', icon: UsersIcon, bg: '#eff6ff', color: '#2a78d6', adminOnly: true },
    { key: 'totalHuds', label: 'ღონისძიებები', icon: HudIcon, bg: '#f0fdfa', color: '#1baf7a' },
    { key: 'totalEvents', label: 'დღეები', icon: CalendarIcon, bg: '#fef9c3', color: '#eda100' },
    { key: 'totalBatches', label: 'კალათები', icon: BasketIcon, bg: '#f0fdf4', color: '#008300' },
    { key: 'totalTickets', label: 'გაყიდული ბ.', icon: TicketIcon, bg: '#f5f3ff', color: '#4a3aa7' },
    { key: 'totalRevenue', label: 'შემოსავალი', icon: RevenueIcon, bg: '#fff7ed', color: '#eb6834', prefix: '₾' },
]

export const StatsCards = ({ stats, isAdmin }) => {
    const visibleCards = CARDS.filter(c => !c.adminOnly || isAdmin)

    return (
        <Section title={"სტატისტიკა"}>
            <div className={styles.grid}>
                {visibleCards.map(c => (
                    <div key={c.key} className={styles.card}>
                        <div className={styles.cardIcon} style={{ background: c.bg, color: c.color }}>
                            <c.icon />
                        </div>
                        <div className={styles.cardBody}>
                            <p className={styles.cardNum}>
                                {c.prefix}{Number(stats[c.key] ?? 0).toLocaleString('ka-GE')}
                            </p>
                            <p className={styles.cardLabel}>{c.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    )
}
