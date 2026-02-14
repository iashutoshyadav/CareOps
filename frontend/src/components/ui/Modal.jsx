import { X } from 'lucide-react';
import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-md', unstyled = false, hideCloseButton = false }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
        >
            <div
                className={`bg-white rounded-3xl shadow-2xl w-full ${maxWidth} transform transition-all scale-100`}
                onClick={(e) => e.stopPropagation()}
            >
                {!unstyled && (
                    <div className="flex justify-between items-center p-6 border-b border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                        {!hideCloseButton && (
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-500 transition-colors p-1 rounded-full hover:bg-gray-100">
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                )}
                {unstyled && !hideCloseButton && (
                    <button onClick={onClose} className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 bg-white/50 hover:bg-white rounded-full p-2 transition-all backdrop-blur-sm">
                        <X className="w-5 h-5" />
                    </button>
                )}
                <div className={unstyled ? '' : 'p-6'}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
