import React, { useEffect, useState } from 'react'
import { MyEvents } from '../components/MyEvents/MyEvents'
import { useAuth } from '../context/AuthContext'

export const DashboardPage = () => {
    const { token } = useAuth()

    return (
        <>
            {token && (
                <div>
                    ჩემი ივენთბი
                    <MyEvents />
                </div>
            )}
        </>
    )
}
