import styles from './styles.module.scss'

export const STATUS = {
    pending:  { label: 'მომლოდინე',     cls: styles.sPending },
    verified: { label: 'ვერიფიცირებული', cls: styles.sVerified },
    rejected: { label: 'უარყოფილი',      cls: styles.sRejected },
}

function formatDate(d) {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('ka-GE', { day: 'numeric', month: 'short', year: 'numeric' })
}

export const List = ({ items, loading, isAdmin, saving, onUpdateStatus }) => {
    return (
        <>
            <div className="box" style={{ padding: 0, overflow: 'hidden' }}>
                <div className={styles.tableHead}>
                    <span>მყიდველი</span>
                    <span>პ/ნ</span>
                    <span>HUD</span>
                    {isAdmin && <span>კლიენტი</span>}
                    <span>სტატუსი</span>
                    <span>თარიღი</span>
                    <span>მოქმედება</span>
                </div>

                {loading ? (
                    <div className={styles.empty}>იტვირთება...</div>
                ) : items.length === 0 ? (
                    <div className={styles.empty}>მოთხოვნები არ არის</div>
                ) : items.map(v => (
                    <div key={v.id} className={styles.row}>
                        <div className={styles.buyerCell}>
                            <div className={styles.avatar}>{(v.buyer_name || v.buyer_id || '?')[0].toUpperCase()}</div>
                            <div>
                                <p className={styles.buyerName}>{v.buyer_name || v.buyer_id}</p>
                                {v.buyer_phone && <p className={styles.buyerSub}>{v.buyer_phone}</p>}
                            </div>
                        </div>
                        <span className={styles.cell}>{v.buyer_personal_id || '—'}</span>
                        <span className={styles.cell}>{v.hud_title}</span>
                        {isAdmin && <span className={styles.cell} style={{ color: '#888' }}>{v.owner_name}</span>}
                        <span>
                            <span className={`${styles.badge} ${STATUS[v.status]?.cls}`}>
                                {STATUS[v.status]?.label}
                            </span>
                        </span>
                        <span className={styles.cell} style={{ color: '#aaa', fontSize: 12 }}>{formatDate(v.created_at)}</span>
                        <span className={styles.actions}>
                            {v.status !== 'verified' && (
                                <button
                                    className={`${styles.actionBtn} ${styles.approveBtn}`}
                                    onClick={() => onUpdateStatus(v.id, 'verified')}
                                    disabled={saving === v.id}
                                >
                                    ✓ დადასტ.
                                </button>
                            )}
                            {v.status !== 'rejected' && (
                                <button
                                    className={`${styles.actionBtn} ${styles.rejectBtn}`}
                                    onClick={() => onUpdateStatus(v.id, 'rejected')}
                                    disabled={saving === v.id}
                                >
                                    ✕ უარი
                                </button>
                            )}
                        </span>
                    </div>
                ))}
            </div>
            <p className={styles.count}>სულ: {items.length}</p>
        </>
    )
}
