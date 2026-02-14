import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import useAuth from '../hooks/useAuth';

export const WorkspaceContext = createContext(null);

export const WorkspaceProvider = ({ children }) => {
    const { user } = useAuth();
    const [workspace, setWorkspace] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.workspaceId) {
            // Fetch workspace details logic here if needed
            // For now, we trust the ID or fetch it
            api.get('/workspace').then(({ data }) => {
                if (data.data.workspaces && data.data.workspaces.length > 0) {
                    setWorkspace(data.data.workspaces[0]); // Default to first
                }

                setLoading(false);
            }).catch(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [user]);

    return (
        <WorkspaceContext.Provider value={{ workspace, setWorkspace, loading }}>
            {children}
        </WorkspaceContext.Provider>
    );
};
