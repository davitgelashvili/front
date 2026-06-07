import styles from './ListItemCard.module.scss'
import DateFormat from '../DateFormat/DateFormat'
import CustomButton from './CustomButton'
import DeleteButton from './DeleteButton'

const STATUS_STYLE = {
    pending:   { bg: '#fff7ed', color: '#c2410c', label: 'მომლოდინე' },
    published: { bg: '#f0fdf4', color: '#16a34a', label: 'გამოქვეყნებული' },
    rejected:  { bg: '#fef2f2', color: '#dc2626', label: 'უარყოფილი' },
    archived:  { bg: '#f9fafb', color: '#6b7280', label: 'არქივი' },
}

export default function ListItemCard({ cover, avatar, title, description, date, stats = [], actions = [], onDelete, status, statusActions = [] }) {
    const st = status ? STATUS_STYLE[status] : null
    return (
        <div className={`box ${styles.item}`}>
            {cover ? (
                <figure className={styles.item__cover}>
                    <img src={cover} alt='cover' />
                </figure>
            ) : avatar ? (
                <div className={styles.item__avatar}>
                    <span className={styles['item__avatar--initials']}>{avatar}</span>
                </div>
            ) : null}

            <div className={styles.item__body}>
                <div className={styles.item__text}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <h1 className={styles['item__text--title']} style={{ margin: 0 }}>{title}</h1>
                        {st && (
                            <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: st.bg, color: st.color, whiteSpace: 'nowrap' }}>
                                {st.label}
                            </span>
                        )}
                    </div>
                    {description && (
                        <div className={styles['item__text--desc']}>{description}</div>
                    )}
                    {date && (
                        <div className={styles['item__text--date']}>
                            <span>თარიღი: </span>
                            <span>{DateFormat(date.start).getDate()}</span>
                            {' - '}
                            <span>{DateFormat(date.end).getDate()}</span>
                        </div>
                    )}
                </div>

                {statusActions.length > 0 && (
                    <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                        {statusActions.map(a => (
                            <button key={a.label} onClick={a.onClick} disabled={a.disabled}
                                style={{ fontSize: 11, padding: '3px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 600, background: a.bg || '#e5e7eb', color: a.color || '#374151' }}>
                                {a.label}
                            </button>
                        ))}
                    </div>
                )}
                <div className={`${styles['item__footer']} d-flex align-items-center justify-content-between`}>
                    <div className='d-flex gap-3'>
                        {stats.map(stat => (
                            <div key={stat.label} className={styles['item__footer--ticket']}>
                                <p className={styles['item__footer--ticket-name']}>{stat.label}</p>
                                <p className={styles['item__footer--ticket-count']}>{stat.value ?? 0}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles['item__footer--actions']}>
                        {onDelete && <DeleteButton onClick={onDelete} />}
                        {actions.map(action => (
                            <CustomButton key={action.label} url={action.url} style={action.style}>
                                {action.label}
                            </CustomButton>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
