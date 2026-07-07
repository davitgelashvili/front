import { Section } from '@/components/Section/Section'
import styles from '../styles.module.scss'

const STATUS_CLS = {
    active: styles.sActive, valid: styles.sActive,
    validated: styles.sValidated, used: styles.sUsed, cancelled: styles.sCancelled,
}

function formatDate(d) {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('ka-GE', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export const TicketsList = ({ tickets }) => {
    return (
        <Section title={`ბილეთები (${tickets.length})`}>
            <div className="box" style={{ padding: 0, overflow: 'hidden' }}>
                <div className={styles.tHead}>
                    <span>Ticket ID</span>
                    <span>შოუ</span>
                    <span>ივენთი</span>
                    <span>კალათა</span>
                    <span>სტატუსი</span>
                    <span>პლატფ.</span>
                    <span>თარიღი</span>
                </div>
                {tickets.length === 0 ? (
                    <div className={styles.empty}>ბილეთები არ არის</div>
                ) : tickets.map(t => (
                    <div key={t.ticket_id} className={styles.tRow}>
                        <span className={styles.mono}>{t.ticket_id}</span>
                        <span className={styles.cell}>{t.hud_title}</span>
                        <span className={styles.cell}>{t.event_title}</span>
                        <span className={styles.cell}>{t.batch_name} · ₾{t.batch_price}</span>
                        <span><span className={`${styles.badge} ${STATUS_CLS[t.status] || styles.sActive}`}>{t.status}</span></span>
                        <span className={styles.cell} style={{ color: '#aaa', fontSize: 12 }}>{t.platform}</span>
                        <span className={styles.cell} style={{ color: '#aaa', fontSize: 12 }}>{formatDate(t.sold_at)}</span>
                    </div>
                ))}
            </div>
        </Section>
    )
}