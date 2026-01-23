import { useEffect, useState } from "react";
import Item from "../hud/list/Item";
import CustomButton from "../../components/ui/CustomButton";
import useApi from "../../http/useApi";
import { useAuth } from "../../context/AuthContext";

export default function DashboardList() {
    const [data, setData] = useState(null)
    const { isToken } = useAuth()
    const { request } = useApi()

    useEffect(() => {
        async function load() {
            try {
                const respons = await request({
                    url: `/client/hud`,
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
        <div className="container">
            <div className="row">
                {data && data?.map(item => {
                    return (
                        <div className="col-4" key={item.id}>
                            <Item data={item} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}