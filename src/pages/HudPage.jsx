import React from 'react'
import HudList from '../features/hud/list/List'
import AddButton from '../components/ui/AddButton'

export const HudPage = () => {
    return (
        <>
            <HudList />
            <AddButton text={'Add Hud'} url={'add'} />
        </>
    )
}
