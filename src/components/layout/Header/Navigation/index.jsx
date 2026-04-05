import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

export const Navigation = () => {
    return (
        <div className={`${styles['menu']} d-flex`}>
            <Link className={styles.menu__link} to="/dashboard">Dashboard</Link>
            <Link className={styles.menu__link} to="/hud">Huds</Link>
            <Link className={styles.menu__link} to="/tickets">Tickets</Link>
            <Link className={styles.menu__link} to="#">Reports</Link>
        </div>
    )
}
