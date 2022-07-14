import './App.css';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './customRoutes/PrivateRoute';
import AssignmentView from './pages/AssignmentView';


function App() {
 

    // useEffect(() => {

    //   if (!jwt) {
        
    //     const requestBody = {
    //       "username":"user",
    //       "password":"u"
    //     }
    //     fetch("api/auth/login", {
    //       headers: {
    //         "Content-Type":"application/json",
    //       },
    //       method: "post",
    //       body: JSON.stringify(requestBody)
    //     })
    //     .then((response) => 
    //                     Promise.all([response.json(), response.headers])
    //     ).then(([body, headers]) => 
    //     {
    //       setJwt(headers.get("authorization"));
    //     });
    //   }
    //   }, [])

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