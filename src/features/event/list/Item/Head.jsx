import { Link } from 'react-router-dom'
import DateFormat from '../../../../components/DateFormat/DateFormat'
import styles from './styles.module.scss'

export const Head = ({ item }) => {
    return (
        <div className={`${styles['head']} d-flex align-items-center justify-content-between`}>
            <div className='d-flex align-items-center'>
                <div className={`${styles['head__date']}`}>
                    <p className={`${styles['title']}`}>{DateFormat(item?.start_datetime).getMonth()}</p>
                    <p className={`${styles['number']}`}>{DateFormat(item?.start_datetime).getDate()}</p>
                </div>
                <h1 className={`${styles['head__title']}`}>
                    {item?.title}
                    {/* <p>{item?.min_price} - {item?.max_price} ლარი</p> */}
                </h1>
            </div>
            <div>
                <Link to={item?.id}>Manage Ticket</Link>
                <Link to={'/'}>edit</Link>
            </div>
        </div>
    )
}
