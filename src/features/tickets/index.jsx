import React from 'react'
import { AddTicket } from './add'
import { ListTickets } from './list'

export const Tickets = () => {
    return (
        <div className="container">
            <h1>Tickets Management</h1>
            <AddTicket />
            <ListTickets />
        </div>
    )
}