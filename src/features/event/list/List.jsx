import styles from './styles.module.scss'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../../../http/useApi";
import { useAuth } from "../../../context/AuthContext";
import { Item } from "./Item";
import CustomButton from "../../../components/ui/CustomButton";

export default function EventList() {
    const [data, setData] = useState(null)
    const { isToken } = useAuth()
    const { hud_id } = useParams()
    const { request } = useApi(isToken)

    useEffect(() => {
        async function load() {
            try {
                const respons = await request({
                    url: `/v1/hud/${hud_id}/event`,
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
            <CustomButton url={'add'} style={'light'}>
                <span className={styles['list--addbtn']}>Add Day</span>
            </CustomButton>
        </>
    )
}
