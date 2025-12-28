import './App.css';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/login';
import { DashboardPage } from './pages/dashboard';
function App() {

    return (
        <AuthProvider>
            <LoginPage />
            <DashboardPage />
        </AuthProvider>
    );
}

export default App;
