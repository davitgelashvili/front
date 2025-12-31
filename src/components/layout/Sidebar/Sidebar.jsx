import { Menu } from './Menu'
import styles from './../styles.module.scss'
import { useAuth } from '../../../context/AuthContext'

const Sidebar = () => {
    const {logout} = useAuth()

    function handleLogout() {
        logout()
    }
    return (
        <div className={`${styles.sidebar}`}>
            <div className='box'>
                <Menu />
                <button onClick={handleLogout}>log Out</button>
            </div>
        </div>
    )
}

export default Sidebar