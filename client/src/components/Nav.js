import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const Nav = (props) => {
  const { topLink, linkText, info } = props;

  return (
    <Navbar>
      <Container>
        <h2 style={{ fontFamily: "Brush Script MT" }}>{info}</h2>
        <NavLink to={topLink}>{linkText}</NavLink>
      </Container>
    </Navbar>
  );
};

export default Nav;
