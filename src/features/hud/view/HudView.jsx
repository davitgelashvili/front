import { useParams } from 'react-router-dom'
import useApi from '../../../http/useApi'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import EventList from '../../event/list/List'

export default function HudView() {
    const [data, setData] = useState(null)
    const { id } = useParams()
    const { isToken } = useAuth()
    const { request } = useApi(isToken)

    useEffect(() => {
        async function load() {
            try {
                const respons = await request({
                    url: `/hud/${id}`,
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
    }, [id])

    let date
    function dateFormat(_date) {
        date = new Date(_date)

        return `${date.getDate() + '/' + date.getMonth() + 1}`
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-9'>
                    <div className='box'>
                        <EventList idd={id}/>
                    </div>
                </div>
                <div className='col-3'>
                    <div className='box'>
                        <figure>
                            <img src={data?.cover} alt='cover' style={{ width: '100%' }} />
                        </figure>
                        <div>
                            <h1>{data?.title}</h1>
                            <p>{data?.description}</p>
                            <p>ლინკი:<span>{data?.slug}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
