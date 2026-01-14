import React from 'react'
import DateFormat from '../../../components/DateFormat/DateFormat'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

export const Item = ({ item, index }) => {
    return (
        <div className={styles.item}>
            <div className="box">
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <div style={{ textAlign: 'center' }}>
                                <h2>{index + 1}</h2>
                                <p>დღე</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div style={{ textAlign: 'center' }}>
                                <h2>{DateFormat(item.start_datetime).getDate()}</h2>
                                <p>{DateFormat(item.start_datetime).getMonth()}</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div style={{ textAlign: 'center' }}>
                                <h2>{item.min_price}</h2>
                                <p>მინ. ფასი</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div style={{ textAlign: 'center' }}>
                                <h2>{item.max_price}</h2>
                                <p>მაქს. ფასი</p>
                            </div>
                        </div>
                        <div className="col-1" style={{display: 'flex',alignItems: 'center'}}>
                            <div style={{ textAlign: 'center'}}>
                                <Link to={`${item.id}`}>view</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
