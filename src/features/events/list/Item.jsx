import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

export default function Item({ data }) {

    let date
    function dateFormat(_date) {
        date = new Date(_date)

        return `${date.getDate() +'/'+ date.getMonth()+1}`
    }

    return (
        <div className={`box ${styles.item}`}>
            <figure className={`${styles.item__cover}`}>
                <img src={data?.cover} alt='cover' />
            </figure>
            <div className={`${styles.item__body}`}>
                <Link to={`/events/${data.event_id}`}>{data?.title}</Link>
                <p>დასაწყისი:<span>{dateFormat(data?.start_at)}</span></p>
                <p>ლოკაცია:<span>{data?.location}</span></p>
            </div>
        </div>
    )
}
