import { BrowserRouter as Router } from 'react-router-dom'
import './App.module.scss'
import AppRouter from './AppRouter'
import { LoginPage } from './pages/Login'
import { useAuth } from './context/AuthContext'

export const App = () => {
    const { isToken } = useAuth()
    console.log(isToken)
    return (
        <Router>
            {isToken ? <AppRouter /> : <LoginPage />}
        </Router>
    )
}
