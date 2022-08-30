import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider/UserProvider";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import backgroundImg from "../img/clouds_sky_porous_133455_1920x1080.jpg"


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
          window.location.href="/dashboard";
        }));

  }
  return (
    <div style={{ position:"fixed", 
                  top:"0", 
                  left:"0",
                  width:"100%",
                  height:"100%",
                   backgroundImage: `url(${backgroundImg})`, }}>


      <Container style={{ marginTop: "50px" }}>
        <Form>
          <Row className="justify-content-center">
            <Col md="8" lg="6">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="fs-4">Username</Form.Label>
                <Form.Control size="lg" type="text" placeholder="Enter your username" onChange={usernameHandler} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md="8" lg="6">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="fs-4">Password</Form.Label>
                <Form.Control size="lg" type="password" placeholder="Enter your password" onChange={passwordHandler} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8" lg="6" className="mt-2 d-flex flex-column gap-3 flex-md-row justify-content-md-between">
              <Button size="lg" variant="primary" type="button" onClick={sendLoginRequest}>
                Log in
              </Button>
              <Button size="lg" variant="secondary" type="button" onClick={() => {
                window.location.href = "/";
              }}
              >
                Exit
              </Button>
            </Col>
          </Row>

        </Form>

      </Container>
    </div>
  );
};

export default Login;

