import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../../../http/useApi";
import { useAuth } from "../../../context/AuthContext";
import { Item } from "./Item";
import AddButton from "../../../components/ui/AddButton";

export default function EventList() {
    const [data, setData] = useState(null)
    const { isToken } = useAuth()
    const { hud_id } = useParams()
    const { request } = useApi(isToken)

    useEffect(() => {
        async function load() {
            try {
                const respons = await request({
                    url: `/hud/${hud_id}/event`,
                    method: 'GET'
                })
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
            <div>
                {data && data?.map((item, index) => {
                    return (
                        <Item item={item} index={index} key={item.id} />
                    )
                })}
            </div>
            <AddButton url={'add'} text={'Add Day'} />
        </>
    )
}
