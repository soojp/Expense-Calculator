import React from "react";
import Nav from "./Nav";
import InputForm from "./InputForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";

const AddCategory = ({ user }) => {
  const navigate = useNavigate();

  const submit = (category, setErrors) => {
    axios
      .post(`http://localhost:8000/api/categories`, category, {
        withCredentials: true,
      })
      .then((res) => {
        navigate(`/${user.username}`);
      })
      .catch((err) => {
        console.log(`something went wrong`, err.response);
        if (err.response.data.error.errors) {
          setErrors(err.response.data.error.errors);
        } else if (err.response.data) {
          setErrors(err.response.data);
        }
      });
  };

  return (
    <Container>
      <Nav
        topLink={`/${user.username}`}
        linkText="Home"
        info="Adding a Category"
      />
      <InputForm submit={submit} buttonText="Submit" />
    </Container>
  );
};

export default AddCategory;
