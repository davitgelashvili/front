import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { EventPage } from "./pages/EventPage";
import AddEventPage from "./pages/AddEventPage";
import EventDetailPage from "./pages/EventDetailPage";
import AddTicketPage from "./pages/AddTicketPage";

export default function AppRouter() {
    return (
        <>
        <Routes>
            <Route path='/*' element={<Layout />}>
                <Route index element={<DashboardPage />} />
                <Route path="events" element={<EventPage />} />
                <Route path="events/:id" element={<EventDetailPage />} />
                <Route path="events/add" element={<AddEventPage />} />
                <Route path="events/:id/add" element={<AddTicketPage />} />
            </Route>
        </Routes>
        </>
    )
}