import { Link } from 'react-router-dom'
import DateFormat from '../../../../components/DateFormat/DateFormat'
import styles from './styles.module.scss'
import CustomButton from '../../../../components/ui/CustomButton'

export const Head = ({ item, onDelete }) => {
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
            <div className={`${styles['head__btns']} d-flex align-items-center`}>
                <div className={`${styles['head__btns--in']}`}>
                    <CustomButton url={item?.id} style={'dark'}>
                        <span className={`${styles['head__btns--btn']}`}>Manage Ticket</span>
                    </CustomButton>
                </div>
                <div className={`${styles['head__btns--in']}`}>
                    <CustomButton url={`${item?.id}/edit`} style={'light'}>
                        <span className={`${styles['head__btns--btn']}`}>Edit</span>
                    </CustomButton>
                </div>
                <button className={styles['head__delete']} onClick={onDelete}>Delete</button>
            </div>
        </div>
    )
}
