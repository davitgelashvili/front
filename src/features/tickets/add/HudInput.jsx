import React, { useEffect, useState } from 'react'
import useApi from '../../../http/useApi'
import { useAuth } from '../../../context/AuthContext'
import InputText from '../../../components/ui/InputText'

export const HudInput = ({ value, onChange }) => {
    const { isToken, userRole } = useAuth()
    const { request } = useApi(isToken)
    const [huds, setHuds] = useState([])
    const prefix = userRole === 'Admin' ? '/dashboard' : '/panel'

    useEffect(() => {
        loadHuds()
    }, [])

    async function loadHuds() {
        try {
            const respons = await request({
                url: `${prefix}/hud`,
                method: 'GET'
            })
            if (respons.success) {
                setHuds(respons.items || [])
            }
        } catch (error) {
            console.error(error)
        }
    }

    const options = huds.map(hud => ({ value: hud.id, label: hud.title }))

    return (
        <InputText
            title="HUD"
            type="select"
            value={value}
            onChange={onChange}
            options={options}
        />
    )
}