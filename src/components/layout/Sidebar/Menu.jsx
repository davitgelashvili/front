import React from 'react'
import { Link } from 'react-router-dom'

export const Menu = () => {
    return (
        <ul>
            <li>
                <Link to={'/'}>მთავარი</Link>
            </li>
            <li>
                <Link to={'/events'}>ივენთები</Link>
            </li>
        </ul>
    )
}
