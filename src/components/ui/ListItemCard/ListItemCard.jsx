import styles from './ListItemCard.module.scss'
import DateFormat from '@/components/DateFormat/DateFormat'
import CustomButton from '@/components/ui/CustomButton/CustomButton'
import DeleteButton from '@/components/ui/DeleteButton'

export const STATUS_STYLE = {
    pending: { bg: '#c2410c', color: '#fff', label: 'მომლოდინე' },
    published: { bg: '#16a34a', color: '#fff', label: 'გამოქვეყნებული' },
    rejected: { bg: '#dc2626', color: '#fff', label: 'უარყოფილი' },
    archived: { bg: '#6b7280', color: '#fff', label: 'არქივი' },
}

export default function ListItemCard({ cover, avatar, title, description, date, stats = [], actions = [], onDelete, status, statusActions = [] }) {
    const st = status ? STATUS_STYLE[status] : null
    return (
        <div className={`box ${styles.item}`}>
            {cover ? (
                <figure className={styles.item__cover}>
                    <img className={styles['item__cover--backdrop']} src={cover} alt='' aria-hidden='true' />
                    <img className={styles['item__cover--img']} src={cover} alt='cover' />
                </figure>
            ) : avatar ? (
                <div className={styles.item__avatar}>
                    <span className={styles['item__avatar--initials']}>{avatar}</span>
                </div>
            ) : null}

            <div className={styles.item__body}>
                <div className={styles.item__text}>
                    <h1 className={styles['item__text--title']}>{title}</h1>
                    {st && (
                        <span style={{ fontSize: 14, fontWeight: 400, padding: '4px 8px', borderRadius: 16, background: st.bg, color: st.color, whiteSpace: 'nowrap' }}>
                            {st.label}
                        </span>
                    )}
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
                    <div className='row'>
                        {stats.map((stat, index) => (
                            <div className='col' key={index + stat.label}>
                                <div key={stat.label} className={`${styles['item__footer--ticket']}`}>
                                    <p className={styles['item__footer--ticket-name']}>{stat.label}</p>
                                    <p className={styles['item__footer--ticket-count']}>{stat.value ?? 0}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`${styles['item__footer']}`}>
                    {statusActions.length > 0 && (
                        <div className={`${styles['item__footer--actions']} row`}>
                            {statusActions.map((a, index) => (
                                <div className='col' key={index + a.label}>
                                    <button key={a.label} onClick={a.onClick} disabled={a.disabled}
                                        style={{ fontSize: 11, padding: '3px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 600, background: a.bg || '#e5e7eb', color: a.color || '#374151' }}>
                                        {a.label}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className={`row`}>
                        {actions.map(action => (
                            <div className='col' key={action.label}>
                                <CustomButton url={action.url} style={action.style}>
                                    {action.label}
                                </CustomButton>
                            </div>
                        ))}
                        {onDelete && <div className='col-auto'><DeleteButton onClick={onDelete} /></div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
