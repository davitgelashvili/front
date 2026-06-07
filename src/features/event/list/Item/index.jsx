import styles from './styles.module.scss'
import { Head } from './Head'
import { Body } from './Body'

export const Item = ({ item, index, onDelete, onStatusChange }) => {
    return (
        <div className={`${styles['item']} box`}>
            <Head item={item} onDelete={onDelete} onStatusChange={onStatusChange} />
        </div>
    )
}
