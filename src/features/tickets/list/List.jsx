import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../../../http/useApi";

export default function TicketList({ id }) {
    const [data, setData] = useState(null)
    // const { id } = useParams()
    const { request } = useApi()

    useEffect(() => {
        async function load() {
            try {
                const respons = await request({
                    url: `events/${id}/tickets`,
                    method: 'GET'
                })

                console.log(1, respons)
                if (respons.success) {
                    setData(respons.tickets)
                    return respons
                }
            } catch (error) {
                console.log(error)
            }
        }
        load()
    }, [id])
    return (
        <>
            <Link to={'add'}>add</Link>
            <div className="container">
                <div className="row">
                    {data && data?.map((item, key) => {
                        { console.log(item) }
                        return (
                            <div className="col-4" key={item.event_id}>
                                <div className="box">
                                    <h3>{item.name ? item.name : `დღე ${key + 1}`}</h3>
                                    <p>გაყიდვის დრო: {item.date}</p>
                                    {item?.tiers.map((_it, key) => {
                                        return (
                                            <div className="box" style={_it.is_active ? {border: '1px solid green'} : null}>
                                                <h4>კალათა: {key + 1}</h4>
                                                <p>სულ: {_it.capacity}</p>
                                                <p>გაყიდული: {_it.sold}</p>
                                                <p>დარჩა: {_it.capacity - _it.sold}</p>
                                                <p>ფასი: {_it.price_cents / 100} ₾.</p>
                                                <p>კალატის ნომერი: {_it.tier_no}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
