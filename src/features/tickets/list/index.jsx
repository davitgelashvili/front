import React, { useEffect, useState } from 'react'
import useApi from '../../../http/useApi'
import { useAuth } from '../../../context/AuthContext'
import { TicketItem } from './Item'

export const ListTickets = () => {
    const { isToken } = useAuth()
    const { request } = useApi(isToken)
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        loadTickets()
    }, [])

    async function loadTickets() {
        try {
            const respons = await request({
                url: `/dashboard/ticket`,
                method: 'GET'
            })
            if (respons.success) {
                setTickets(respons.tickets)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h2>Tickets List</h2>
            <ul>
                {tickets.map(ticket => (
                    <TicketItem key={ticket.id} ticket={ticket} />
                ))}
            </ul>
        </div>
    )
}