import { Routes, Route } from 'react-router-dom'
import { TestUserProvider } from './context/UserContext'
import TestHeader from './components/Header'
import Home from './pages/Home'
import ShowDetail from './pages/ShowDetail'
import EventDetail from './pages/EventDetail'
import MyTickets from './pages/MyTickets'

export default function TestSiteApp() {
    return (
        <TestUserProvider>
            <TestHeader />
            <Routes>
                <Route index                     element={<Home />} />
                <Route path="show/:id"           element={<ShowDetail />} />
                <Route path="event/:id"          element={<EventDetail />} />
                <Route path="tickets/:userId"    element={<MyTickets />} />
            </Routes>
        </TestUserProvider>
    )
}
