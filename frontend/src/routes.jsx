import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WorkspaceProvider } from './context/WorkspaceContext';
import { NotificationProvider } from './context/NotificationContext';
import { SocketProvider } from './context/SocketContext';


// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import PublicLayout from './layouts/PublicLayout';
import OnboardingLayout from './layouts/OnboardingLayout';

// Routes
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

// Pages
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Onboarding from './features/onboarding/Onboarding';
import Dashboard from './features/dashboard/Dashboard';
import Contacts from './features/contacts/Contacts';
import Bookings from './features/bookings/Bookings';
import Inventory from './features/inventory/Inventory';
import Staff from './features/staff/Staff';
import Forms from './features/forms/Forms';
import FormDetail from './features/forms/FormDetail';
import Inbox from './features/inbox/Inbox';
import Settings from './features/settings/Settings';

import Home from './features/public/Home';
import PublicPage from './features/public/PublicPage';
import PublicBooking from './features/public/PublicBooking';


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <NotificationProvider>
                    <WorkspaceProvider>
                        <SocketProvider>
                            <Routes>
                                {/* Public Routes */}
                                <Route element={<PublicLayout />}>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/f/:id" element={<PublicPage />} />
                                    <Route path="/book/:slug" element={<PublicBooking />} />
                                    <Route path="/booking/:id?" element={<PublicPage />} />

                                    <Route element={<PublicRoute />}>
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/register" element={<Register />} />
                                        <Route path="/forgot-password" element={<div>Forgot Password</div>} />
                                    </Route>
                                </Route>

                                {/* Onboarding */}
                                <Route element={<PrivateRoute />}>
                                    <Route element={<OnboardingLayout />}>
                                        <Route path="/onboarding" element={<Onboarding />} />
                                    </Route>
                                </Route>

                                {/* Protected Dashboard Routes */}
                                <Route element={<PrivateRoute />}>
                                    <Route element={<DashboardLayout />}>
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="/contacts" element={<Contacts />} />
                                        <Route path="/bookings" element={<Bookings />} />
                                        <Route path="/inbox" element={<Inbox />} />
                                        <Route path="/forms" element={<Forms />} />
                                        <Route path="/forms/:id" element={<FormDetail />} />
                                        <Route path="/inventory" element={<Inventory />} />
                                        <Route path="/staff" element={<Staff />} />
                                        <Route path="/settings" element={<Settings />} />

                                    </Route>
                                </Route>


                                {/* 404 */}
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </SocketProvider>
                    </WorkspaceProvider>
                </NotificationProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default AppRoutes;
