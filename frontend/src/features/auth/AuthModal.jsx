import { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import Login from './Login';
import Register from './Register';

const AuthModal = ({ isOpen, onClose, initialView = 'login' }) => {
    const [view, setView] = useState(initialView);

    useEffect(() => {
        if (isOpen) setView(initialView);
    }, [isOpen, initialView]);

    const switchView = (newView) => setView(newView);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            maxWidth="max-w-[480px]"
            unstyled
            hideCloseButton={true}
        >
            <div className="p-6 md:p-8 rounded-xl">
                <div className="flex justify-center mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                            <span className="text-white font-bold text-xl">C</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900 tracking-tight">CareOps</span>
                    </div>
                </div>

                {view === 'login' ? (
                    <Login onSuccess={onClose} onSwitch={() => switchView('register')} />
                ) : (
                    <Register onSuccess={onClose} onSwitch={() => switchView('login')} />
                )}
            </div>
        </Modal>
    );
};

export default AuthModal;
