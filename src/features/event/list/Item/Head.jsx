import { Link } from 'react-router-dom'
import DateFormat from '../../../../components/DateFormat/DateFormat'
import styles from './styles.module.scss'
import CustomButton from '../../../../components/ui/CustomButton'
import DeleteButton from '../../../../components/ui/DeleteButton'
import { useAuth } from '../../../../context/AuthContext'

const STATUS_STYLE = {
    pending:   { bg: '#fff7ed', color: '#c2410c', label: 'მომლოდინე' },
    published: { bg: '#f0fdf4', color: '#16a34a', label: 'გამოქვეყნებული' },
    rejected:  { bg: '#fef2f2', color: '#dc2626', label: 'უარყოფილი' },
    archived:  { bg: '#f9fafb', color: '#6b7280', label: 'არქივი' },
}

export const Head = ({ item, onDelete, onStatusChange }) => {
    const { userRole } = useAuth()
    const isAdmin = userRole === 'Admin'
    const st = item?.status ? STATUS_STYLE[item.status] : null

    return (
        <div className={`${styles['head']} d-flex align-items-center justify-content-between`}>
            <div className='d-flex align-items-center'>
                <div className={`${styles['head__date']}`}>
                    <p className={`${styles['title']}`}>{DateFormat(item?.start_datetime).getMonth()}</p>
                    <p className={`${styles['number']}`}>{DateFormat(item?.start_datetime).getDate()}</p>
                </div>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <h1 className={`${styles['head__title']}`} style={{ margin: 0 }}>
                            {item?.title}
                            <span style={{ fontSize: '13px', color: '#666', marginLeft: '10px' }}>
                                {item?.batch_count || 0} batch
                                {item?.min_price != null && (
                                    <span style={{ marginLeft: 8, color: '#2e7d32', fontWeight: 600 }}>
                                        {item.min_price === item.max_price
                                            ? `₾${item.min_price}`
                                            : `₾${item.min_price} — ₾${item.max_price}`}
                                    </span>
                                )}
                            </span>
                        </h1>
                        {st && (
                            <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: st.bg, color: st.color, whiteSpace: 'nowrap' }}>
                                {st.label}
                            </span>
                        )}
                    </div>
                    {isAdmin && onStatusChange && (
                        <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                            {item.status !== 'published' && (
                                <button onClick={() => onStatusChange(item.id, 'published')}
                                    style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, border: 'none', cursor: 'pointer', background: '#f0fdf4', color: '#16a34a', fontWeight: 600 }}>
                                    ✓ გამოქვეყნება
                                </button>
                            )}
                            {item.status !== 'rejected' && (
                                <button onClick={() => onStatusChange(item.id, 'rejected')}
                                    style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, border: 'none', cursor: 'pointer', background: '#fef2f2', color: '#dc2626', fontWeight: 600 }}>
                                    ✕ უარყოფა
                                </button>
                            )}
                            {item.status !== 'archived' && (
                                <button onClick={() => onStatusChange(item.id, 'archived')}
                                    style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, border: 'none', cursor: 'pointer', background: '#f9fafb', color: '#6b7280', fontWeight: 600 }}>
                                    📦 არქივი
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className={`${styles['head__btns']} d-flex align-items-center`}>
                <div className={`${styles['head__btns--in']}`}>
                    <CustomButton url={`${item?.id}/attendees`} style={'light'}>
                        დამსწრეები
                    </CustomButton>
                </div>
                <div className={`${styles['head__btns--in']}`}>
                    <CustomButton url={item?.id} style={'dark'}>
                        Manage Ticket
                    </CustomButton>
                </div>
                <div className={`${styles['head__btns--in']}`}>
                    <CustomButton url={`${item?.id}/edit`} style={'light'}>
                        Edit
                    </CustomButton>
                </div>
                <DeleteButton onClick={onDelete} />
            </div>
        </div>
    )
}
