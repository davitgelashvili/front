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
                        <div className="col-3">
                            <div style={{ textAlign: 'center' }}>
                                <h5>{item.name}</h5>
                                <p>სახელი</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div style={{ textAlign: 'center' }}>
                                <h2>{item.price}</h2>
                                <p>ფასი</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div style={{ textAlign: 'center' }}>
                                <h2>{item.capacity}</h2>
                                <p>რაოდენობა</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div style={{ textAlign: 'center' }}>
                                <h2>{item.sold_count}</h2>
                                <p>გაყიდული</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
