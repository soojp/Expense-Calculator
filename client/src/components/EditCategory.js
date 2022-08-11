import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "./Nav";
import InputForm from "./InputForm";
import Container from "react-bootstrap/Container";

const EditCategory = ({ user }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/categories/${id}`)
      .then((res) => {
        setCurrentCategory(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const submit = (category, setErrors, setCategoryError) => {
    axios
      .put(`http://localhost:8000/api/categories/${id}`, category)
      .then((res) => {
        console.log(res.data);
        navigate(`/${user.username}`);
      })
      .catch((err) => {
        console.log(err.response.data);
        if (
          err.response.data.error.code === 11000 &&
          err.response.data.error.keyPattern.category === 1
        ) {
          setCategoryError(
            "Category already exists. Please add to existing category or rename category name."
          );
        } else {
          setCategoryError(null);
        }
        if (err.response.data.error.errors) {
          setErrors(err.response.data.error.errors);
        } else {
          setErrors(err.response.data);
        }
      });
  };
  return (
    currentCategory && (
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Nav
          topLink={`/${user.username}`}
          linkText="Home"
          info="Editing a Category"
        />
        <InputForm
          submit={submit}
          buttonText="Save"
          currentCategory={currentCategory}
        />
      </Container>
    )
  );
};

export default EditCategory;
