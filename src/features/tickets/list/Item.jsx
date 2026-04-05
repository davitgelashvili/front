import React from 'react'

export const TicketItem = ({ ticket }) => {
    return (
        <li>
            {ticket.buyer_name} - {ticket.status} - {ticket.ticket_id}
        </li>
    )
}