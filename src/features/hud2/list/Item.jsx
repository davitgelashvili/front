import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import DateFormat from '../../../components/DateFormat/DateFormat'

export default function Item({ data }) {

    return (
        <div className={`box ${styles.item}`}>
            <figure className={`${styles.item__cover}`}>
                <img src={data?.cover} alt='cover' />
            </figure>
            <div className={`${styles.item__body}`}>
                <div className={`${styles['item__text']}`}>
                    <h1 className={`${styles['item__text--title']}`}>{data?.title}</h1>
                    <div className={`${styles['item__text--desc']}`}>{data?.description}</div>
                    <div className={`${styles['item__text--date']}`}>
                        <span>თარიღი: </span>
                        <span>{DateFormat(data?.start_datetime).getDate()}</span> - <span>{DateFormat(data?.end_datetime).getDate()}</span>
                    </div>
                </div>
                <div className={`${styles['item__footer']} d-flex align-items-center justify-content-between`}>
                    <div className={`${styles['item__footer--ticket']}`}>
                        <p className={`${styles['item__footer--ticket-name']}`}>Tickets Sold</p>
                        <p className={`${styles['item__footer--ticket-count']}`}>80% Capacity</p>
                    </div>
                    <Link to={`${data.id}`} className={`${styles['item__footer--link']}`} >Manage</Link>
                </div>  
            </div>
        </div>
    )
}
