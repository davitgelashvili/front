import { Link } from "react-router-dom";
import Item from "./Item";
import useApi from "../../../http/useApi";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function EventList() {
    const [data, setData] = useState(null)
    const { isToken } = useAuth()
    const { request } = useApi(isToken)
    useEffect(() => {
        async function load() {
            try {
                const respons = await request({
                    url: `/hud`,
                    method: 'GET'
                })

                if (respons.success) {
                    setData(respons.items)
                }
            } catch (error) {
                console.error(error)
            }
        }
        load()
    }, [isToken])
    return (
        <>
            <Link to={'add'}>add</Link>
            <div className="container box">
                <div className="row">
                    {data && data?.map(item => {
                    {console.log(item)}
                        return (
                            <div className="col-4" key={item.event_id}>
                                <Item data={item} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
