import { Link } from 'react-router-dom'
import { useTestUser } from '../context/UserContext'
import styles from './Header.module.scss'

export default function TestHeader() {
    const { users, activeUser, selectUser } = useTestUser()

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link to="/test" className={styles.logo}>🎟 TestSite</Link>
                <nav className={styles.nav}>
                    {activeUser && (
                        <Link to={`/test/tickets/${activeUser.id}`} className={styles.link}>
                            ჩემი ბილეთები
                        </Link>
                    )}
                    <div className={styles.userSelector}>
                        <select
                            value={activeUser?.id || ''}
                            onChange={e => selectUser(e.target.value)}
                            className={styles.select}
                        >
                            {users.map(u => (
                                <option key={u.id} value={u.id}>
                                    {u.is_valid ? '✅' : '❌'} {u.name} — 🪙 {u.coins}
                                </option>
                            ))}
                        </select>
                    </div>
                </nav>
            </div>
        </header>
    )
}
