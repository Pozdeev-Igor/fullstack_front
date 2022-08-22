import './App.css';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './customRoutes/PrivateRoute';
import AssignmentView from './pages/AssignmentView';


function App() {

  return (

    <Routes>
      <Route 
            path='/dashboard' 
                  element={<PrivateRoute> <Dashboard/> </PrivateRoute> } />
      
      <Route  path='/' element={<HomePage/>}  />   
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/assignments/:id' element={<PrivateRoute><AssignmentView/></PrivateRoute>}/>
    </Routes>
    
  );
}

export default App;