import './App.css';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './customRoutes/PrivateRoute';
import AssignmentView from './pages/AssignmentView';
import jwt_decode from "jwt-decode";
import {useState} from "react";
import CodeReviewerDashboard from "./pages/CodeReviewerDashboard";


function App() {

    const [roles, setRoles] = useState(getRolesFromJWT());

    function getRolesFromJWT() {
        if (localStorage.getItem("jwt")) {
            const decodedJwt = jwt_decode(localStorage.getItem("jwt"));
            console.log(decodedJwt);
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

                              <CodeReviewerDashboard />
                          </PrivateRoute>
                      ) : (
                          <PrivateRoute>
                              <Dashboard />
                          </PrivateRoute>
                      ) } />
      
      <Route  path='/' element={<HomePage/>}  />   
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/assignments/:id' element={<PrivateRoute><AssignmentView/></PrivateRoute>}/>
    </Routes>
    
  );
}

export default App;