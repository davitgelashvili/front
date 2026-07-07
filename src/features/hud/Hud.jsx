import useApi from "@/http/useApi";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { FilterBar } from "./list/FilterBar";
import List from "./list/List";
import { Section } from "@/components/Section/Section";
import CustomButton from '@/components/ui/CustomButton/CustomButton';

export default function Hud() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const { isToken, userRole } = useAuth()
    const { request } = useApi(isToken)
    const toast = useToast()
    const prefix = userRole === 'Admin' ? '/dashboard' : '/panel'

    useEffect(() => {
        async function load() {
            try {
                const res = await request({ url: `${prefix}/hud`, method: 'GET' })
                if (res.success) setData(res.items)
            } catch (err) { console.error(err) }
        }
        load()
    }, [isToken])

    const handleDeleteHud = async (hudId) => {
        if (!window.confirm('ნამდვილად წაშალო ეს HUD?')) return
        try {
            await request({ url: `${prefix}/hud/${hudId}`, method: 'DELETE' })
            setData(prev => prev.filter(h => h.id !== hudId))
            toast('HUD წაიშალა', 'success')
        } catch (err) {
            console.error(err)
            toast('წაშლა ვერ მოხერხდა', 'error')
        }
    }

    const filtered = data.filter(item =>
        !search ||
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="container">
            <Section
                title={'Event List'}
                elements={<>
                    <div>
                        <CustomButton url={userRole === 'Admin' ? '/clients' : 'add'} style="dark">
                            Create Event
                        </CustomButton>
                    </div>
                </>}>
                <FilterBar search={search} setSearch={setSearch} userRole={userRole} />
                <List items={filtered} onDelete={handleDeleteHud} />
                {filtered.length === 0 && (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#aaa' }}>
                        HUD ვერ მოიძებნა
                    </div>
                )}
            </Section>
        </div>
    )
}