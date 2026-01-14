import React from 'react'
import { Link } from 'react-router-dom'

export const Navigation = () => {
    return (
        <ul>
            <li>
                <Link to={'/'}>მთავარი</Link>
            </li>
            <li>
                <Link to={'/hud'}>ჰუდები</Link>
            </li>
        </ul>
    )
}
