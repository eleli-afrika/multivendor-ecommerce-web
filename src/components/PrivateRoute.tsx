import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { user } = useSelector((state: any) => state.auth);
    console.log(user);
    return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
