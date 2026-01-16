import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

export const Card = ({ name, price }) => {
    return (
        <div className={`${styles['card']} box`}>
            <div className={`${styles['card__head']} d-flex align-items-center justify-content-between`}>
                <h1>{name}</h1>
                <p>{price}</p>
            </div>
        </div>
    )
}
