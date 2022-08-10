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
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState();
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");

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
      .catch((err) => {
        console.log(`something went wrong`, err.response);
        if (
          err.response.data.code === 11000 &&
          err.response.data.keyPattern.email === 1
        ) {
          setEmailError("Email is already being used. Please login.");
        } else {
          setEmailError(null);
        }
        if (
          err.response.data.code === 11000 &&
          err.response.data.keyPattern.username === 1
        ) {
          setUsernameError(
            "Username is taken. Please choose a different username."
          );
        } else {
          setUsernameError(null);
        }
        if (err.response.data.error.errors) {
          setErrors(err.response.data.error.errors);
        } else {
          setErrors(null);
        }
      });
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {errors && <Form.Text>{errors}</Form.Text>}
        {emailError && <Form.Text>{emailError}</Form.Text>}
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
        {usernameError && <Form.Text>{usernameError}</Form.Text>}
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
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
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
            type="password"
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
