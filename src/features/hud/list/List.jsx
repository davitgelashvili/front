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
                    url: `/dashboard/hud`,
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

    const handleDeleteHud = async (hudId) => {
        if (!window.confirm('ნამდვილად წაშალო ეს HUD?')) return;

        try {
            await request({
                url: `/dashboard/hud/${hudId}`,
                method: 'DELETE'
            })
            setData((prevData) => prevData.filter((hud) => hud.id !== hudId))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="container">
            <div className="row">
                {data && data?.map(item => {
                    return (
                        <div className="col-4" key={item.id}>
                            <Item data={item} onDelete={() => handleDeleteHud(item.id)} />
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