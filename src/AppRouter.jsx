import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
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
import AttendeesPage from "./pages/AttendeesPage";
import TicketsPage from "./pages/TicketsPage";
import AdminAddClientPage from "./pages/AdminAddClientPage";
import ClientsPage from "./pages/ClientsPage";
import ClientManagePage from "./pages/ClientManagePage";
import EditClientPage from "./pages/EditClientPage";
import AdminAddHudPage from "./pages/AdminAddHudPage";
import AddTicketPage from "./pages/AddTicketPage";
import EditTicketPage from "./pages/EditTicketPage";
import ValidateTicketPage from "./pages/ValidateTicketPage";
import ProfilePage from "./pages/ProfilePage";
import VerificationsPage from "./pages/VerificationsPage";
import BuyersPage from "./pages/BuyersPage";
import BuyerDetailPage from "./pages/BuyerDetailPage";
import AddBuyerPage from "./pages/AddBuyerPage";
import EditBuyerPage from "./pages/EditBuyerPage";
import TestSiteApp from "./TestSite/TestSiteApp";

function MainApp() {
    return (
        <>
            <Header />
            <Routes>
                <Route index element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/clients/add" element={<ProtectedRoute role="Admin"><AdminAddClientPage /></ProtectedRoute>} />
                <Route path="/clients" element={<ProtectedRoute role="Admin"><ClientsPage /></ProtectedRoute>} />
                <Route path="/clients/:user_id" element={<ProtectedRoute role="Admin"><ClientManagePage /></ProtectedRoute>} />
                <Route path="/clients/:user_id/edit" element={<ProtectedRoute role="Admin"><EditClientPage /></ProtectedRoute>} />
                <Route path="/clients/:user_id/hud/add" element={<ProtectedRoute role="Admin"><AdminAddHudPage /></ProtectedRoute>} />
                <Route path="/tickets" element={<TicketsPage />} />
                <Route path="/tickets/add" element={<AddTicketPage />} />
                <Route path="/tickets/:ticket_id/edit" element={<EditTicketPage />} />
                <Route path="/tickets/validate" element={<ProtectedRoute role="Admin"><ValidateTicketPage /></ProtectedRoute>} />
                <Route path="/verifications" element={<VerificationsPage />} />
                <Route path="/buyers" element={<BuyersPage />} />
                <Route path="/buyers/add" element={<ProtectedRoute role="Admin"><AddBuyerPage /></ProtectedRoute>} />
                <Route path="/buyers/:id" element={<BuyerDetailPage />} />
                <Route path="/buyers/:id/edit" element={<ProtectedRoute role="Admin"><EditBuyerPage /></ProtectedRoute>} />
                <Route path="/profile" element={<ProfilePage />} />
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
                    <Route path="hud/:hud_id/:event_id/attendees" element={<AttendeesPage />} />
                </Route>
            </Routes>
        </>
    )
}

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/test/*" element={<TestSiteApp />} />
            <Route path="/*"      element={<MainApp />} />
        </Routes>
    )
}
