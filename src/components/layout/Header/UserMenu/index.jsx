import styles from './styles.module.scss'
import { useAuth } from '../../../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

export const UserMenu = () => {
    const { logout } = useAuth()
    const navigate = useNavigate();

    function handleLogout() {
        logout()
        navigate("/")
    }

    return (
        <div className={`${styles['usermenu']}`}> 
            <div className={`${styles['usermenu__avatar']}`}>
            </div>
            <button onClick={handleLogout} className={`${styles['usermenu__logout']}`}>log Out</button>
        </div>
    )
}
