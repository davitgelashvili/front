import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { testApi } from '../http/api'
import styles from './Home.module.scss'

function formatDate(d) {
    if (!d) return ''
    return new Date(d).toLocaleDateString('ka-GE', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function Home() {
    const [shows, setShows] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        testApi.shows()
            .then(r => setShows(r.data.data))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div className={styles.center}>იტვირთება...</div>

    return (
        <div className={styles.page}>
            <div className={styles.grid}>
                {shows.map(show => (
                    <Link to={`/test/show/${show.id}`} key={show.id} className={styles.card}>
                        <div className={styles.cover}>
                            {show.cover
                                ? <img src={show.cover} alt={show.name} />
                                : <div className={styles.noCover}>🎭</div>
                            }
                            {show.isSoldOut && <span className={styles.soldOut}>გაყიდულია</span>}
                        </div>
                        <div className={styles.info}>
                            <h3 className={styles.title}>{show.name}</h3>
                            <p className={styles.dates}>
                                {formatDate(show.fromDate)}
                                {show.toDate && show.toDate !== show.fromDate && ` — ${formatDate(show.toDate)}`}
                            </p>
                            <p className={styles.price}>
                                {show.minPrice > 0
                                    ? show.minPrice === show.maxPrice
                                        ? `${show.minPrice} ₾`
                                        : `${show.minPrice} – ${show.maxPrice} ₾`
                                    : 'უფასო'
                                }
                            </p>
                            <p className={styles.eventCount}>{show.eventCount} სეანსი</p>
                        </div>
                    </Link>
                ))}
            </div>
            {shows.length === 0 && <p className={styles.empty}>შოუები არ არის</p>}
        </div>
    )
}
