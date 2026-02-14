import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>; // Replace with Loader later

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
