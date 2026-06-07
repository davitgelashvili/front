import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import DeleteButton from '../../../components/ui/DeleteButton'

export const Item = ({ item, onDelete }) => {
    const sold = item.sold_count ?? item.ticket_count ?? 0
    const capacity = item.capacity ?? 0
    const pct = capacity > 0 ? Math.min(100, Math.round((sold / capacity) * 100)) : 0
    const isActive = item.is_active === undefined ? true : !!item.is_active
    const barColor = !isActive ? '#d1d5db' : pct >= 90 ? '#ef4444' : pct >= 60 ? '#f59e0b' : '#22c55e'

    return (
        <div className={styles.item}>
            <div className="box" style={{ opacity: isActive ? 1 : 0.6 }}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <p className={styles.label}>სახელი</p>
                        <p className={styles.value}>{item.name}</p>
                    </div>
                    <div className={styles.col}>
                        <p className={styles.label}>ფასი</p>
                        <p className={styles.value}>₾{item.price}</p>
                    </div>
                    <div className={styles.col}>
                        <p className={styles.label}>სტატუსი</p>
                        <p className={styles.value} style={{ fontSize: 14, color: isActive ? '#16a34a' : '#c62828' }}>
                            {isActive ? '✓ აქტიური' : '✕ გათიშული'}
                        </p>
                    </div>
                    <div className={styles.colWide}>
                        <div className={styles.capRow}>
                            <span className={styles.label}>გაყიდული</span>
                            <span className={styles.capNumbers}>{sold} / {capacity}</span>
                            <span className={styles.pct} style={{ color: barColor }}>{pct}%</span>
                        </div>
                        <div className={styles.barTrack}>
                            <div className={styles.barFill} style={{ width: `${pct}%`, background: barColor }} />
                        </div>
                    </div>
                    <div className={styles.colActions}>
                        <Link to={`${item.id}/edit`} className={styles.editLink}>რედაქტირება</Link>
                        <DeleteButton onClick={onDelete} />
                    </div>
                </div>
            </div>
        </div>
    )
}
