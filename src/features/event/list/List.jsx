import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../../../http/useApi";
import { useAuth } from "../../../context/AuthContext";
import DateFormat from "../../../components/DateFormat/DateFormat";

export default function EventList({ idd }) {
    const [data, setData] = useState(null)
    const { isToken } = useAuth()
    const { id } = useParams()
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
                    setData(respons.events)
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
                {data && data?.map((item, index) => {
                    return (
                        <div className="box" key={item.id}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-3">
                                        <div style={{ textAlign: 'center' }}>
                                            <h2>{index + 1}</h2>
                                            <p>დღე</p>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div style={{ textAlign: 'center' }}>
                                            <h2>{DateFormat(item.start_datetime).getDate()}</h2>
                                            <p>{DateFormat(item.start_datetime).getMonth()}</p>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div style={{ textAlign: 'center' }}>
                                            <h2>{item.min_price}</h2>
                                            <p>მინ. ფასი</p>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div style={{ textAlign: 'center' }}>
                                            <h2>{item.max_price}</h2>
                                            <p>მაქს. ფასი</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
