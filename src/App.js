import './App.css';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './customRoutes/PrivateRoute';
import AssignmentView from './pages/AssignmentView';
import jwt_decode from "jwt-decode";
import {useEffect, useState} from "react";
import CodeReviewerDashboard from "./pages/CodeReviewerDashboard";
import CodeReviewerAssignmentView from "./pages/CodeReviewerAssignmentView";
import {UserProvider, useUser} from "./UserProvider/UserProvider";


function App() {

    const user = useUser();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
       setRoles(getRolesFromJWT());
    }, [user.jwt]);

    function getRolesFromJWT() {
        if (user.jwt) {
            const decodedJwt = jwt_decode(user.jwt);
            return decodedJwt.authorities;
        }
        return [];
    }

    return (
            <Routes>
                <Route
                    path='/dashboard'
                    element={
                        roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
                            <PrivateRoute>
                                <CodeReviewerDashboard/>
                            </PrivateRoute>
                        ) : (
                            <PrivateRoute>
                                <Dashboard/>
                            </PrivateRoute>
                        )}/>

                <Route path='/assignments/:assignmentId'
                       element={
                    roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
                        <PrivateRoute>
                            <CodeReviewerAssignmentView/>
                        </PrivateRoute>
                    ) : (
                        <PrivateRoute>
                            <AssignmentView/>
                        </PrivateRoute>
                    )
                }
                />
                <Route path="login" element={<LoginPage/>}/>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
    );
}

export default App;