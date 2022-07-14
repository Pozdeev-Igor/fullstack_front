import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider/UserProvider";


const Login = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  
  function usernameHandler(e) {
    e.preventDefault();
    //console.log(e.target.value);
    setUsername(e.target.value);
  };
  function passwordHandler(e) {
    e.preventDefault();
    //console.log(e.target.value);
    setPassword(e.target.value);
  }
  
  // useEffect(() => {
  //   if (user.jwt) navigate("/dashboard");
  // }, [user]);

  function sendLoginRequest(e) {

    e.preventDefault();
    setErrorMsg("");
    const reqBody = {
      username,
      password
    };

    fetch("api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      // .then((response) => {
      //   if (response.status === 200) return response.text();
      //   else if (response.status === 401 || response.status === 403) {
      //     setErrorMsg("Invalid username or password");
      //   } else {
      //     setErrorMsg(
      //       "Something went wrong, try again later or reach out to trevor@coderscampus.com"
      //     );
      //   }
      // })
      // .then((data) => {
      //   if (data) {
      //     console.log(data);
      //     //data.token = 'zv';
      //     localStorage.setItem('jwt', JSON.stringify(data.password));
      //     navigate("/dashboard");
      //     console.log(data);
      //   }
      // })
      .then((response) => Promise.all([response.json(), response.headers])
          .then(([body, headers]) => {
            const authValue = headers.get("authorization");
            //console.log(authValue);
            localStorage.setItem('jwt', authValue);
            navigate("/dashboard");
          }));

  }
  return (
    <form className="login-form" >
        <div className="form-outline mb-4">
            <input type="text" id="form2Example1" className="form-control"  onChange={usernameHandler}/>
            <label className="form-label" htmlFor="form2Example1" >Username</label>
        </div>

        <div className="form-outline mb-4">
            <input type="password" id="form2Example2" className="form-control" onChange={passwordHandler}/>
            <label className="form-label" htmlFor="form2Example2">Password</label>
        </div>

        <div className="row mb-4">
            <div className="col d-flex justify-content-center">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
                    <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                </div>
            </div>

            <div className="col">
                <a href="src/pages/login/LoginPage#!">Forgot password?</a>
            </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4" onClick={sendLoginRequest}>Sign in</button>

        <div className="text-center">
            <p>Not a member? <a href="/registration">Register</a></p>
            <p>or sign up with:</p>
            <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-facebook-f"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-google"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-twitter"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-github"></i>
            </button>
        </div>
    </form>
);
};

export default Login;

