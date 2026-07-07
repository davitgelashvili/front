import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "@/http/useApi";
import { useAuth } from "@/context/AuthContext";
import { Item } from "./Item";
import CustomButton from '@/components/ui/CustomButton/CustomButton';
import { useToast } from "@/context/ToastContext";
import { Section } from "@/components/Section/Section";

export default function EventList() {
    const [data, setData] = useState(null)
    const { isToken, userRole } = useAuth()
    const { hud_id } = useParams()
    const { request } = useApi(isToken)
    const toast = useToast()
    const prefix = userRole === 'Admin' ? '/dashboard' : '/panel'

    useEffect(() => {
        async function load() {
            try {
                const respons = await request({
                    url: `${prefix}/hud/${hud_id}/event`,
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
    }, [isToken, hud_id, request])

    const handleStatusChange = async (eventId, status) => {
        try {
            await request({ url: `/dashboard/event/${eventId}/status`, method: 'PATCH', data: { status } })
            setData(prev => prev.map(e => e.id === eventId ? { ...e, status } : e))
            toast('სტატუსი განახლდა', 'success')
        } catch (err) {
            console.error(err)
            toast('სტატუსის შეცვლა ვერ მოხერხდა', 'error')
        }
    }

    const handleDeleteEvent = async (eventId) => {
        if (!window.confirm('ნამდვილად წაშალო ეს დღე?')) return;
        try {
            await request({ url: `${prefix}/hud/${hud_id}/event/${eventId}`, method: 'DELETE' })
            setData(prev => prev.filter(e => e.id !== eventId))
            toast('ივენთის დღე წაიშალა', 'success')
        } catch (error) {
            console.error(error)
            toast('წაშლა ვერ მოხერხდა', 'error')
        }
    }

    return (
        <Section
            title={'Day List'}
            elements={<>
                <div className="col-auto">
                    <CustomButton url={'add'} style={'dark'}>
                        Add Day
                    </CustomButton>
                </div>
            </>}>
            <div>
                {data && data?.map((item, index) => {
                    return (
                        <Item item={item} index={index} key={item.id} onDelete={() => handleDeleteEvent(item.id)} onStatusChange={handleStatusChange} />
                    )
                })}
            </div>
        </Section>
    )
}
