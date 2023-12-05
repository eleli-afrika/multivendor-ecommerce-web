import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { userToken } = useSelector((state: any) => state.auth);
    // console.log(user);
    return userToken ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
