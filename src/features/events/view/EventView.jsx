import { useParams } from 'react-router-dom'
import useApi from '../../../http/useApi'
import { useEffect, useState } from 'react'
import TicketList from '../../tickets/list/List'
import { useAuth } from '../../../context/AuthContext'

export default function EventView() {
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
                    setData(respons.event)
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
                        {/* <TicketList id={id}/> */}
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
                            <p>დასაწყისი:<span>{dateFormat(data?.start_at)}</span></p>
                            <p>ლოკაცია:<span>{data?.location}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
