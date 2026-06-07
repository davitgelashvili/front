import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { testApi } from '../http/api'
import styles from './ShowDetail.module.scss'

function formatDate(d) {
    if (!d) return ''
    return new Date(d).toLocaleDateString('ka-GE', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
}

function formatTime(d) {
    if (!d) return ''
    return new Date(d).toLocaleTimeString('ka-GE', { hour: '2-digit', minute: '2-digit' })
}

export default function ShowDetail() {
    const { id } = useParams()
    const [show, setShow] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        testApi.show(id)
            .then(r => setShow(r.data.data))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return <div className={styles.center}>იტვირთება...</div>
    if (!show)   return <div className={styles.center}>შოუ ვერ მოიძებნა</div>

    return (
        <div className={styles.page}>
            <div className={styles.hero}>
                {show.cover && <img src={show.cover} alt={show.name} className={styles.cover} />}
                <div className={styles.heroInfo}>
                    <h1 className={styles.name}>{show.name}</h1>
                    {show.description && (
                        <div className={styles.desc} dangerouslySetInnerHTML={{ __html: show.description }} />
                    )}
                </div>
            </div>

            <div className={styles.eventsSection}>
                <h2 className={styles.sectionTitle}>სეანსები ({show.events?.length})</h2>
                <div className={styles.eventGrid}>
                    {show.events?.map(event => (
                        <Link
                            key={event.id}
                            to={event.isSoldOut ? '#' : `/test/event/${event.id}`}
                            className={`${styles.eventCard} ${event.isSoldOut ? styles.soldOut : ''}`}
                        >
                            <div className={styles.eventDate}>{formatDate(event.date)}</div>
                            <div className={styles.eventTime}>{formatTime(event.date)}</div>
                            <div className={styles.eventPrice}>
                                {event.minPrice
                                    ? event.minPrice === event.maxPrice
                                        ? `${event.minPrice} ₾`
                                        : `${event.minPrice}–${event.maxPrice} ₾`
                                    : '—'
                                }
                            </div>
                            {event.isSoldOut && <span className={styles.soldOutBadge}>გაყიდულია</span>}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
