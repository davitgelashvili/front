import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

export default function CustomButton({ children, url, style, onSubmit }) {
    return (
        <>
            {
                url ? (
                    <Link className={`${styles.custombutton} ${styles[`custombutton--${style}`]}`} to={url}>{children}</Link >
                ) : (
                    <button className={`${styles.custombutton} ${styles[`custombutton__btn--${style}`]}`} onSubmit={onSubmit} >{children}</button >
                )

            }
        </>
    )
}
