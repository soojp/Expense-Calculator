import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

const CategoryDetail = ({ user }) => {
  const [category, setCategory] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/categories/${id}`)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <Container>
      <Nav
        topLink={`/${user.username}`}
        linkText="Home"
        info={`About ${category.category}`}
      />
      <h3 className="text-danger">Total: ${category.sum}</h3>
      <Table bordered>
        <thead>
          <td>Item</td>
          <td>Cost ($)</td>
        </thead>
        {category.rows &&
          category.rows.map((row) => (
            <tbody key={row._id}>
              <td>{row.name}</td>
              <td>{row.cost}</td>
            </tbody>
          ))}
      </Table>
    </Container>
  );
};

export default CategoryDetail;
