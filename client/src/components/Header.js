import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get("http://localhost:8000/api/current-user", {
          withCredentials: true,
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      setUser(null);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    axios
      .post("http://localhost:8000/logout", {}, { withCredentials: true })
      .then((res) => {
        setIsLoggedIn(false);
        setUser(null);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Navbar>
      <Container>
        <h1
          style={{
            fontFamily: "Brush Script MT, cursive",
            fontWeight: "bolder",
            fontSize: "3em",
          }}
        >
          Expense Calculator
        </h1>
        <Row>
          {user ? (
            <Col>
              <Row>
                <Col>
                  <p>User: {user.username}</p>
                </Col>
                <Col>
                  <Button onClick={handleLogout}>Logout</Button>
                </Col>
              </Row>
            </Col>
          ) : (
            <Col>
              <Row>
                <Col>
                  <NavLink className="text-success" to="/login">
                    Login
                  </NavLink>
                </Col>
                <Col>
                  <NavLink className="text-success" to="/register">
                    Register
                  </NavLink>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Container>
    </Navbar>
  );
};

export default Header;
