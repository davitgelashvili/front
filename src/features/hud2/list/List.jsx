import { Link } from "react-router-dom";
import Item from "./Item";
import useApi from "../../../http/useApi";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import AddButton from "../../../components/ui/AddButton";

export default function HudList() {
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
            <AddButton text={'Add Hud'} url={'add'} />
        </div>
    )
}
