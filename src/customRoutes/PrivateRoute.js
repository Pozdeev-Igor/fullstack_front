import React  from 'react';
import { Navigate } from 'react-router-dom';
import { useLocalState } from '../util/useLocalState';

const PrivateRoute = ({children}) => {

    const jwt = useLocalState();

    return jwt ? children : <Navigate to="/login" />
};

export default PrivateRoute;