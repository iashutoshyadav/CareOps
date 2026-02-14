import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import PublicNavbar from '../components/PublicNavbar';
import AuthModal from '../features/auth/AuthModal';

const PublicLayout = () => {
    const location = useLocation();
    const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);

    const [authModal, setAuthModal] = useState({ isOpen: false, view: 'login' });

    const openLogin = () => setAuthModal({ isOpen: true, view: 'login' });
    const openRegister = () => setAuthModal({ isOpen: true, view: 'register' });
    const closeAuthModal = () => setAuthModal(prev => ({ ...prev, isOpen: false }));

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <PublicNavbar openLogin={openLogin} openRegister={openRegister} />
            <div className={`flex-grow flex flex-col ${isAuthPage ? 'justify-center py-12 sm:px-6 lg:px-8' : ''}`}>
                {isAuthPage && (
                    <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
                        <span className="text-3xl font-bold text-indigo-600">CareOps</span>
                    </div>
                )}
                <Outlet context={{ openLogin, openRegister }} />
            </div>
            <AuthModal
                isOpen={authModal.isOpen}
                onClose={closeAuthModal}
                initialView={authModal.view}
            />
        </div>
    );
};

export default PublicLayout;
