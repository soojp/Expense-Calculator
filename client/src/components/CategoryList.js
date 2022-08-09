import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import Nav from "./Nav";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

const CategoryList = ({ categories, setCategories }) => {
  const { username } = useParams();
  const [total, setTotal] = useState(0);

  const [socket] = useState(() => io(":8000"));

  function sort(categoriesInput) {
    const sortedData = [...categoriesInput].sort((a, b) => {
      return a.category.toLowerCase() > b.category.toLowerCase() ? 1 : -1;
    });
    setCategories(sortedData);
  }

  useEffect(() => {
    socket.on("connection", () => {
      console.log("CONNECTED");
    });
    axios
      .get(`http://localhost:8000/api/categories-by-user/${username}`, {
        withCredentials: true,
      })
      .then((res) => {
        sort(res.data);
        add();
      })
      .catch((err) => console.log(err));
  }, [categories]);

  const deleteCategory = (categoryId) => {
    socket.emit("deleteCategory", categoryId);
  };
  socket.on("categoryDeleted", (deletedId) => {
    setCategories(categories.filter((category) => category._id !== deletedId));
  });

  function add() {
    let result = 0;
    let sum;
    for (let i = 0; i < categories.length; i++) {
      result += parseFloat(categories[i].sum);
    }
    sum = parseFloat(result).toFixed(2);
    setTotal(sum);
  }

  return (
    <Container>
      <Nav
        topLink="/new"
        linkText="Add a Category"
        info="Summary of Expenses"
      />
      <Table bordered className="bg-dark text-white">
        <thead>
          <tr>
            <td>Category</td>
            <td>Sum ($)</td>
            <td>Actions</td>
          </tr>
        </thead>
        {categories.map((category) => (
          <tbody key={category._id}>
            <tr className="text-center text-white">
              <td>{category.category}</td>
              <td>{category.sum}</td>
              <td>
                <NavLink to={`/category/${category._id}`}>details</NavLink>
                <span> | </span>
                <NavLink to={`/category/edit/${category._id}`}>edit</NavLink>
                <span> | </span>
                <Button
                  variant="danger"
                  onClick={() => deleteCategory(category._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
        {categories && (
          <tbody>
            <tr className="text-center">
              <td className="text-light">Total</td>
              <td className="text-light">{total}</td>
              <td className="text-light">N/a</td>
            </tr>
          </tbody>
        )}
      </Table>
    </Container>
  );
};

export default CategoryList;
