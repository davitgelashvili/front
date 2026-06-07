import { BrowserRouter as Router } from 'react-router-dom'
import './App.module.scss'
import AppRouter from './AppRouter'
import { LoginPage } from './pages/Login'
import { useAuth } from './context/AuthContext'
import { VerificationsProvider } from './context/VerificationsContext'
import VerificationToast from './components/ui/VerificationToast'

export const App = () => {
    const { isToken } = useAuth()
    return (
        <Router>
            {isToken ? (
                <VerificationsProvider>
                    <AppRouter />
                    <VerificationToast />
                </VerificationsProvider>
            ) : (
                <LoginPage />
            )}
        </Router>
    )
}
