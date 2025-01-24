import React from 'react';
import { Navigate } from 'react-router-dom';


interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const user = localStorage.getItem('userToken');

    return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
