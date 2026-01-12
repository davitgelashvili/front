import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { HudPage } from "./pages/HudPage";
import HudDetailPage from "./pages/HudDetailPage";
import AddHudPage from "./pages/AddHudPage";
import AddEventPage from "./pages/AddEventPage";

export default function AppRouter() {
    return (
        <>
        <Routes>
            <Route path='/*' element={<Layout />}>
                <Route index element={<DashboardPage />} />
                <Route path="events" element={<HudPage />} />
                <Route path="events/:id" element={<HudDetailPage />} />
                <Route path="events/add" element={<AddHudPage />} />
                <Route path="events/:id/add" element={<AddEventPage />} />
            </Route>
        </Routes>
        </>
    )
}