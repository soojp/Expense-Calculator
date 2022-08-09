import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Register = ({ setIsLoggedIn, setUser }) => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/register", newUser, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoggedIn(true);
        setUser({ username: newUser.username, password: newUser.password });
        navigate(`/${newUser.username}`);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingUsername" label="Username">
          <Form.Control
            type="text"
            name="username"
            placeholder={newUser.username}
            value={newUser.username}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingEmail" label="Email">
          <Form.Control
            type="email"
            name="email"
            placeholder={newUser.email}
            value={newUser.email}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="text"
            name="password"
            placeholder={newUser.password}
            value={newUser.password}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingConfirmPassword"
          label="Confirm Password"
        >
          <Form.Control
            type="text"
            name="confirmPassword"
            placeholder={newUser.confirmPassword}
            value={newUser.confirmPassword}
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
            <Button type="submit">Register</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Register;
