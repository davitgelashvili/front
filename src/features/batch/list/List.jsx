import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "@/http/useApi";
import { useAuth } from "@/context/AuthContext";
import { useBatchWs } from "../../../hooks/useBatchWs";
import { Item } from "./Item";
import CustomButton from '@/components/ui/CustomButton/CustomButton';
import { useToast } from "@/context/ToastContext";
import { Section } from "@/components/Section/Section";

export default function BatchList() {
    const [data, setData] = useState(null)
    const { isToken, userRole } = useAuth()
    const { event_id } = useParams()
    const { request } = useApi(isToken)
    const toast = useToast()
    const prefix = userRole === 'Admin' ? '/dashboard' : '/panel'

    useEffect(() => {
        async function load() {
            try {
                const respons = await request({
                    url: `${prefix}/event/${event_id}/batch`,
                    method: 'GET'
                })

                if (respons.success) setData(respons.batches)
            } catch (error) {
                console.error(error)
            }
        }
        load()
    }, [isToken, event_id, request])

    useBatchWs(({ batch_id, sold_count }) => {
        setData(prev => prev
            ? prev.map(b => b.id === batch_id ? { ...b, sold_count } : b)
            : prev
        )
    })

    const handleDeleteBatch = async (batchId) => {
        if (!window.confirm('ნამდვილად წაშალო ეს Batch?')) return;
        try {
            await request({ url: `${prefix}/batch/${batchId}`, method: 'DELETE' })
            setData(prev => prev.filter(b => b.id !== batchId))
            toast('კალათა წაიშალა', 'success')
        } catch (error) {
            console.error(error)
            toast('წაშლა ვერ მოხერხდა', 'error')
        }
    }
    return (
        <Section
            title={'Batch List'}
            elements={<>
                <div className="col-auto">
                    <CustomButton url={'add'} style={'dark'}>
                        Add Batch
                    </CustomButton>
                </div>
            </>}>
            <div>
                {data && data?.map((item, index) => {
                    return (
                        <Item item={item} index={index} key={item.id} onDelete={() => handleDeleteBatch(item.id)} />
                    )
                })}
            </div>
        </Section>
    )
}
