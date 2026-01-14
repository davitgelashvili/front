import React, { useEffect, useState } from 'react'
import DateFormat from '../../DateFormat/DateFormat'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import useApi from '../../../http/useApi'

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
        <>
            <figure style={{ margin: 0 }}>
                <img src={data?.cover} alt='cover' style={{ width: '100%' }} />
            </figure>
            <div>
                <h4>{data?.title}</h4>
                <p>{data?.description}</p>
                <p>ლინკი:<span>{data?.slug}</span></p>
                <p>{DateFormat(data?.start_datetime).getDate()} - {DateFormat(data?.end_datetime).getDate()}</p>
            </div>
        </>
    )
}
