import React, { useEffect, useState } from 'react'
import DateFormat from '../../DateFormat/DateFormat'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import useApi from '../../../http/useApi'
import styles from './styles.module.scss'
import CustomButton from '../../ui/CustomButton'

export const HudCard = () => {
    const [data, setData] = useState(null)
    const { hud_id } = useParams()
    const { isToken, userRole } = useAuth()
    const { request } = useApi(isToken)
    const prefix = userRole === 'Admin' ? '/dashboard' : '/panel'

    useEffect(() => {
        async function load() {
            try {
                const respons = await request({
                    url: `${prefix}/hud/${hud_id}`,
                    method: 'GET'
                })

                console.log(respons)
                if (respons.success) {
                    setData(respons.hud)
                    return respons
                }
            } catch (error) {
                console.log(error)
            }
        }
        load()
    }, [hud_id])
    return (
        <div className={`${styles['hudcard']}`}>
            <figure className={`${styles['hudcard__cover']}`}>
                <img src={data?.cover} alt='cover' style={{ width: '100%' }} />
            </figure>
            <div className={`${styles['hudcard__body']}`}>
                <h4 className={`${styles['hudcard__body--title']}`}>{data?.title}</h4>
                <div className={`${styles['hudcard__body--text']}`}>
                    <p>{data?.description}</p>
                    <p>ლინკი: <span>{data?.slug}</span></p>
                    <p>{DateFormat(data?.start_datetime).getDate()} {DateFormat(data?.start_datetime).getMonth()} — {DateFormat(data?.end_datetime).getDate()} {DateFormat(data?.end_datetime).getMonth()}</p>
                    <div className={styles['hudcard__body--meta']}>
                        <span className={`${styles['hudcard__body--tag']} ${data?.requires_verification ? styles.tagOn : styles.tagOff}`}>
                            {data?.requires_verification ? '🔒 ვერიფიკაცია სავალდებულო' : '🔓 ვერიფიკაცია არ სჭირდება'}
                        </span>
                        <span className={styles['hudcard__body--tag']}>
                            🎫 მაქს. ბილეთი: {data?.max_tickets_per_buyer ?? '∞'}
                        </span>
                        {(data?.first_day_min_price != null || data?.last_day_max_price != null) && (
                            <span className={styles['hudcard__body--tag']}>
                                💰 {data?.first_day_min_price ?? '?'} — {data?.last_day_max_price ?? '?'} ₾
                            </span>
                        )}
                    </div>
                </div>
                <div className={`${styles['hudcard__footer']}`}>
                    <CustomButton url={`/hud/${data?.id}/edit`} style={'dark'}>
                        edit hud
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}
