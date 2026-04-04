import React from 'react'
import DateFormat from '../../../components/DateFormat/DateFormat'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

export const Item = ({ item, index, onDelete }) => {
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
                                <button onClick={onDelete} style={{ background: '#eb5757', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginBottom: '8px' }}>წაშლა</button>
                                <br />
                                <Link to={`${item.id}/edit`} style={{ textDecoration: 'none', color: '#007bff' }}>რედაქტირება</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
