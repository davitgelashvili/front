import styles from './styles.module.scss'
import Item from "./Item";
import useApi from "../../../http/useApi";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import CustomButton from "../../../components/ui/CustomButton";

export default function HudList() {
    const [data, setData] = useState(null)
    const { isToken } = useAuth()
    const { request } = useApi(isToken)
    
    useEffect(() => {
        async function load() {
            try {
                const respons = await request({
                    url: `/v1/hud`,
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
            <CustomButton url={'add'} style={'light'}>
                <span className={styles['list--addbtn']}>Add Hud</span>
            </CustomButton>
        </div>
    )
}