import styles from './Stats.module.scss'
import { Section } from '@/components/Section/Section'

const STATUS_CLS = {
    active: 'active', valid: 'valid', validated: 'validated',
    used: 'used', cancelled: 'cancelled',
}

function formatDate(d) {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('ka-GE', { day: 'numeric', month: 'short', year: 'numeric' })
}

export const RecentTickets = ({ items, isAdmin }) => {
    if (!items?.length) return null

    const gridTemplateColumns = isAdmin ? '2fr 2fr 1.5fr 1fr 1fr 80px' : '2fr 2fr 1fr 1fr 80px'

    return (
        <Section title={"ბოლო ბილეთები"}>
            <div className={styles.tableWrap}>
                <div className={styles.tableHead} style={{ gridTemplateColumns }}>
                    <span>HUD</span>
                    <span>ივენთი</span>
                    {isAdmin && <span>კლიენტი</span>}
                    <span>ფასი</span>
                    <span>სტატუსი</span>
                    <span>თარიღი</span>
                </div>
                {items.map(t => (
                    <div key={t.ticket_id} className={styles.tableRow} style={{ gridTemplateColumns }}>
                        <span className={styles.cell}>{t.hud_title}</span>
                        <span className={styles.cell}>{t.event_title}</span>
                        {isAdmin && <span className={styles.cell} style={{ color: '#888' }}>{t.owner_name || '—'}</span>}
                        <span className={styles.cell} style={{ fontWeight: 600 }}>₾{t.batch_price}</span>
                        <span className={styles.cell}>
                            <span className={`${styles.statusBadge} ${styles[STATUS_CLS[t.status] || 'active']}`}>
                                {t.status}
                            </span>
                        </span>
                        <span className={`${styles.cell} ${styles.cellMono}`}>{formatDate(t.sold_at)}</span>
                    </div>
                ))}
            </div>
        </Section>
    )
}