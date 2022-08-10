import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Login = ({ setIsLoggedIn, user, setUser }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const [errors, setErrors] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/login", user, { withCredentials: true })
      .then((res) => {
        setIsLoggedIn(true);
        navigate(`/${user.username}`);
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.error);
        console.log(`errors ${errors}`);
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {errors && <Form.Text>{errors}</Form.Text>}
        <FloatingLabel controlId="floatingUsername" label="Username">
          <Form.Control
            type="text"
            name="username"
            placeholder={user.username}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            name="password"
            placeholder={user.password}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <Row className="p-3">
          <Col>
            <Button
              onClick={() => {
                navigate("/");
              }}
            >
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type="submit">Login</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;
