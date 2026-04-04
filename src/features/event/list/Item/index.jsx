import styles from './styles.module.scss'
import { Head } from './Head'
import { Body } from './Body'

export const Item = ({ item, index, onDelete }) => {
    return (
        <div className={`${styles['item']} box`}>
            <Head item={item} onDelete={onDelete} />
            {/* <Body item={item} index={index}/> */}
        </div>
    )
}
