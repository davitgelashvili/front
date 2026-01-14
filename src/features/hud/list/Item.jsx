import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

export default function Item({ data }) {

    return (
        <div className={`box ${styles.item}`}>
            <figure className={`${styles.item__cover}`}>
                <img src={data?.cover} alt='cover' />
            </figure>
            <div className={`${styles.item__body}`}>
                <Link to={`${data.id}`}>{data?.title}</Link>
            </div>
        </div>
    )
}
