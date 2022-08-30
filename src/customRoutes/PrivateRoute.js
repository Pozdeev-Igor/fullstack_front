import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLocalState } from '../util/useLocalState';
import ajax from "../services/fetchService"

const PrivateRoute = ({ children }) => {
    // const jwt = useLocalState();
    const jwToken = localStorage.getItem('jwt');
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(null);

    if (jwToken) {

        ajax(`/api/auth/validate?token=${jwToken}`, "get", localStorage.getItem('jwt')).then((isValid) => {
            setIsValid(isValid);
            setIsLoading(false);
            return isValid === true ? children : <Navigate to="/login" />
        })
    } else {
        return <Navigate to="/login" />
    }

    return isLoading ? (
        <div>Loading...</div>
    ) : isValid === true ? (
        children
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;