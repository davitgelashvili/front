import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, role }) {
    const { userRole } = useAuth()
    if (userRole !== role) return <Navigate to="/dashboard" replace />
    return children
}
