import { Link } from 'react-router-dom'
import DeleteButton from '@/components/ui/DeleteButton'
import styles from './styles.module.scss'

function formatDate(d) {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('ka-GE', { day: 'numeric', month: 'short', year: 'numeric' })
}

export const List = ({ buyers, loading, isAdmin, onDelete }) => {
    return (
        <>
            <div className="box" style={{ padding: 0, overflow: 'hidden' }}>
                <div className={styles.tableHead}>
                    <span>მყიდველი</span>
                    <span>პირადი №</span>
                    <span>ტელეფონი</span>
                    <span>ბილეთები</span>
                    <span>დახარჯული</span>
                    <span>ბოლო ყიდვა</span>
                    <span></span>
                </div>

                {loading ? (
                    <div className={styles.empty}>იტვირთება...</div>
                ) : buyers.length === 0 ? (
                    <div className={styles.empty}>მყიდველები ვერ მოიძებნა</div>
                ) : buyers.map(b => {
                    const key = b.id || b.buyer_id
                    return (
                        <div key={key} className={styles.tableRow}>
                            <div className={styles.buyerCell}>
                                <div className={styles.avatar}>{(b.name || '?')[0]?.toUpperCase()}</div>
                                <div>
                                    <p className={styles.buyerName}>{b.name}</p>
                                    {b.email && <p className={styles.buyerSub}>{b.email}</p>}
                                    {b.is_test && <p className={styles.buyerSub} style={{ color: '#9ca3af' }}>test</p>}
                                </div>
                            </div>
                            <span className={styles.cell}>{b.personal_id || '—'}</span>
                            <span className={styles.cell}>{b.phone || '—'}</span>
                            <span className={styles.cell} style={{ fontWeight: 600 }}>{b.ticket_count}</span>
                            <span className={styles.cell} style={{ fontWeight: 600 }}>₾{Number(b.total_spent).toLocaleString('ka-GE')}</span>
                            <span className={styles.cell} style={{ color: '#aaa', fontSize: 12 }}>{formatDate(b.last_purchase)}</span>
                            <span className={styles.actions}>
                                <Link to={`/buyers/${encodeURIComponent(key)}`} className={styles.detailLink}>დეტ.</Link>
                                {isAdmin && b.is_registered && <>
                                    <Link to={`/buyers/${key}/edit`} className={styles.editLink}>Edit</Link>
                                    <DeleteButton onClick={() => onDelete(key)} />
                                </>}
                            </span>
                        </div>
                    )
                })}
            </div>
            <p className={styles.count}>სულ: {buyers.length}</p>
        </>
    )
}