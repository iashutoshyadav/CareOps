import { useEffect, createContext, useContext, useState } from 'react';
import { io } from 'socket.io-client';
import useAuth from '../hooks/useAuth';
import useAlerts from '../hooks/useAlerts';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { user } = useAuth();
    const { addNotification } = useAlerts();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (user && user.workspaceId) {
            const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
                transports: ['websocket']
            });

            newSocket.on('connect', () => {
                console.log('Connected to socket server');
                newSocket.emit('join-workspace', user.workspaceId);
            });

            newSocket.on('notification', (data) => {
                addNotification(data.message, data.type || 'info');
            });

            // Specific event listeners
            newSocket.on('BOOKING_CREATED', (data) => {
                addNotification(`New booking: ${data.title}`, 'success');
            });

            newSocket.on('MESSAGE_RECEIVED', (data) => {
                addNotification(`New message from ${data.senderName}`, 'info');
            });

            setSocket(newSocket);

            return () => newSocket.close();
        }
    }, [user, addNotification]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
