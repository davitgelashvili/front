import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import Loader from './Loader'

export default function CustomButton({ children, url, style, onSubmit, onClick, type, loading, disabled }) {
    const content = loading ? <Loader /> : children

    return url ? (
        <Link className={`${styles.custombutton} ${styles[`custombutton__btn--${style}`]}`} to={url}>
            {content}
        </Link>
    ) : (
        <button
            className={`${styles.custombutton} ${styles[`custombutton__btn--${style}`]}`}
            onSubmit={onSubmit}
            onClick={onClick}
            type={type}
            disabled={disabled || loading}
        >
            {content}
        </button>
    )
}
