import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

export default function AddButton({ text, url }) {
    return (
        <Link className={`${styles.addbutton} box`} to={url}>{text}</Link>
    )
}
