import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { HudPage } from "./pages/HudPage";
import AddEventPage from "./pages/AddHudPage";
import AddTicketPage from "./pages/AddEventPage";
import HudDetailPage from "./pages/HudDetailPage";

export default function AppRouter() {
    return (
        <>
        <Routes>
            <Route path='/*' element={<Layout />}>
                <Route index element={<DashboardPage />} />
                <Route path="events" element={<HudPage />} />
                <Route path="events/:id" element={<HudDetailPage />} />
                <Route path="events/add" element={<AddEventPage />} />
                <Route path="events/:id/add" element={<AddEventPage />} />
            </Route>
        </Routes>
        </>
    )
}