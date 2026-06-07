import styles from './styles.module.scss'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'
import { useVerifications } from '../../../../context/VerificationsContext'

export const Navigation = () => {
    const { userRole } = useAuth()
    const { pendingCount } = useVerifications()

    const linkClass = ({ isActive }) =>
        `${styles.menu__link} ${isActive ? styles.active : ''}`

    return (
        <div className={`${styles.menu} d-flex`}>
            <NavLink className={linkClass} to="/dashboard" end>Dashboard</NavLink>
            <NavLink className={linkClass} to="/hud">Huds</NavLink>
            <NavLink className={linkClass} to="/tickets">Tickets</NavLink>
            <NavLink className={linkClass} to="/buyers">Buyers</NavLink>
            <NavLink className={linkClass} to="/verifications">
                Verifications
                {pendingCount > 0 && (
                    <span className={styles.badge}>{pendingCount}</span>
                )}
            </NavLink>
            {userRole === 'Admin' && (
                <NavLink className={linkClass} to="/clients">Clients</NavLink>
            )}
            {userRole === 'Admin' && (
                <NavLink className={linkClass} to="/tickets/validate">Validate</NavLink>
            )}
        </div>
    )
}
