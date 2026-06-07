import { Link } from 'react-router-dom'
import { useVerifications } from '../../context/VerificationsContext'
import styles from './VerificationToast.module.scss'

export default function VerificationToast() {
    const { toasts, removeToast } = useVerifications()

    if (!toasts.length) return null

    return (
        <div className={styles.container}>
            {toasts.map(({ id, v }) => (
                <div key={id} className={styles.toast}>
                    <button className={styles.close} onClick={() => removeToast(id)}>✕</button>
                    <div className={styles.icon}>🔔</div>
                    <div className={styles.body}>
                        <p className={styles.title}>ვერიფიკაციის მოთხოვნა</p>
                        <p className={styles.name}>{v.buyer_name}</p>
                        <p className={styles.hud}>{v.hud_title}</p>
                        <Link to="/verifications" className={styles.link} onClick={() => removeToast(id)}>
                            განხილვა →
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}
