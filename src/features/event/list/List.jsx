import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../../../http/useApi";
import { useAuth } from "../../../context/AuthContext";

export default function EventList({ idd }) {
    const [data, setData] = useState(null)
    const { isToken } = useAuth()
    // const { id } = useParams()
    const { request } = useApi(isToken)

    useEffect(() => {
        console.log(isToken)
        async function load() {
            try {
                const respons = await request({
                    url: `/event`,
                    method: 'GET'
                })

                console.log(1, respons)
                if (respons.success) {
                    // setData(respons.events)
                    return respons
                }
            } catch (error) {
                console.log(error)
            }
        }
        load()
    }, [isToken])
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
                                            <div className="box" style={_it.is_active ? { border: '1px solid green' } : null}>
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
