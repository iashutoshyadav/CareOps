import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

const useAlerts = () => {
    return useContext(NotificationContext);
};

export default useAlerts;
