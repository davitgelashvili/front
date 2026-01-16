import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import { Card } from './Card'

export const Body = ({ item, index }) => {
    return (
        <div className={`${styles['body']}`}>
            <p>Ticket Baskets for Day {index + 1}</p>
            <div className='row'>
                <div className='col-4'>
                    <Card name={'Early Bird'} 
                        price={'50'}
                        />
                </div>
                <div className='col-4'>
                    <Card name={'First Basket'} 
                        price={'50'}
                        />
                </div>
                <div className='col-4'>
                    <Card name={'VIP Lounge'} 
                        price={'50'}
                        />
                </div>
            </div>
        </div>
    )
}
