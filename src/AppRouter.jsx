import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { HudPage } from "./pages/HudPage";
import HudDetailPage from "./pages/HudDetailPage";
import AddHudPage from "./pages/AddHudPage";
import AddEventPage from "./pages/AddEventPage";
import EditEventPage from "./pages/EditEventPage";
import { BatchPage } from "./pages/BatchPage";
import { Header } from "./components/layout/Header";
import { AddBatchPage } from "./pages/AddBatchPage";
import EditHudPage from "./pages/EditHudPage";
import EditBatchPage from "./pages/EditBatchPage";

export default function AppRouter() {
    return (
        <>
            <Header />
            <Routes>
                <Route index element={<DashboardPage />} />
                <Route path="hud" element={<HudPage />} />
                <Route path="hud/add" element={<AddHudPage />} />
                <Route path="hud/:hud_id/edit" element={<EditHudPage />} />
                <Route path='/*' element={<Layout />}>
                    <Route path="hud/:hud_id" element={<HudDetailPage />} />
                    <Route path="hud/:hud_id/add" element={<AddEventPage />} />
                    <Route path="hud/:hud_id/:event_id" element={<BatchPage />} />
                    <Route path="hud/:hud_id/:event_id/edit" element={<EditEventPage />} />
                    <Route path="hud/:hud_id/:event_id/add" element={<AddBatchPage />} />
                    <Route path="hud/:hud_id/:event_id/:batch_id/edit" element={<EditBatchPage />} />
                </Route>
            </Routes>
        </>
    )
}