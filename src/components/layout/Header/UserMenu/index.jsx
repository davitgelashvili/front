import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { useAuth } from '../../../../context/AuthContext'

export const UserMenu = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    function handleLogout() {
        logout()
        navigate('/')
    }

    return (
        <div className={styles.usermenu} ref={ref}>
            <button className={styles.usermenu__trigger} onClick={() => setOpen(o => !o)}>
                <span className={styles.usermenu__avatar} />
            </button>

            {open && (
                <div className={styles.usermenu__dropdown}>
                    <Link
                        to="/profile"
                        className={styles.usermenu__item}
                        onClick={() => setOpen(false)}
                    >
                        რედაქტირება
                    </Link>
                    <button
                        className={`${styles.usermenu__item} ${styles['usermenu__item--danger']}`}
                        onClick={handleLogout}
                    >
                        გამოსვლა
                    </button>
                </div>
            )}
        </div>
    )
}
