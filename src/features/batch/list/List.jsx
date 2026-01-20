import styles from './styles.module.scss'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../../../http/useApi";
import { useAuth } from "../../../context/AuthContext";
import { Item } from "./Item";
import CustomButton from "../../../components/ui/CustomButton";

export default function BatchList() {
    const [data, setData] = useState(null)
    const { isToken } = useAuth()
    const { event_id } = useParams()
    const { request } = useApi(isToken)

    useEffect(() => {
        console.log(isToken)
        async function load() {
            try {
                const respons = await request({
                    url: `/event/${event_id}/batch`,
                    method: 'GET'
                })

                console.log(1, respons)
                if (respons.success) {
                    setData(respons.batches)
                    return respons
                }
            } catch (error) {
                console.log(error)
            }
        }
        load()
    }, [isToken, event_id])
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
                <span className={styles['list--addbtn']}>Add Batch</span>
            </CustomButton>
        </>
    )
}
