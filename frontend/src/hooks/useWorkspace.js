import { useContext } from 'react';
import { WorkspaceContext } from '../context/WorkspaceContext';

const useWorkspace = () => {
    return useContext(WorkspaceContext);
};

export default useWorkspace;
