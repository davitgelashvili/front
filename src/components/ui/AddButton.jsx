import React from 'react'
import { Link } from 'react-router-dom'

export default function AddButton({ text, url }) {
    return (
        <Link to={url}>{text}</Link>
    )
}
