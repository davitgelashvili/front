import React, { useEffect, useState } from 'react'
import DateFormat from '../../DateFormat/DateFormat'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import useApi from '../../../http/useApi'
import styles from './styles.module.scss'

export const HudCard = () => {
    const [data, setData] = useState(null)
    const { hud_id } = useParams()
    const { isToken } = useAuth()
    const { request } = useApi(isToken)

    useEffect(() => {
        async function load() {
            try {
                const respons = await request({
                    url: `/hud/${hud_id}`,
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
                    <p>ლინკი:<span>{data?.slug}</span></p>
                    <p>{DateFormat(data?.start_datetime).getDate()} - {DateFormat(data?.end_datetime).getDate()}</p>
                </div>
                <div className={`${styles['hudcard__footer']}`}>
                    <Link to={`/hud/${data?.id}/edit`} disabled={true}>edit hud</Link>
                </div>
            </div>
        </div>
    )
}
