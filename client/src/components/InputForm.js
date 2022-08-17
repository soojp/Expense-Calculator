import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const InputForm = (props) => {
  const { submit, currentCategory, buttonText } = props;

  const [sum, setSum] = useState(0);
  const [categoryError, setCategoryError] = useState("");
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState(
    currentCategory || {
      category: "",
      sum,
      rows: [
        {
          name: "",
          cost: "",
        },
      ],
    }
  );

  const [rows, setRows] = useState(category.rows);

  let handleCategoryChange = (e) => {
    setCategory({
      [e.target.name]: e.target.value,
    });
  };

  let handleRowChange = (i, e) => {
    let newRows = [...rows];
    newRows[i][e.target.name] = e.target.value;
    setRows(newRows);
  };

  let addRow = () => {
    setRows([...rows, { name: "", cost: "" }]);
  };

  let removeRow = (i) => {
    let newRows = [...rows];
    newRows.splice(i, 1);
    setRows(newRows);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    let resultSum = 0;
    let sum;
    if (rows[0].cost !== "") {
      for (let i = 0; i < rows.length; i++) {
        resultSum += parseFloat(rows[i].cost);
      }
      sum = parseFloat(resultSum).toFixed(2);
    }
    setSum(resultSum);
    if (rows[0].cost === "") {
      let payload = {
        ...category,
        rows,
        sum: 0,
      };
      submit(payload, setErrors, setCategoryError);
    } else {
      let payload = {
        ...category,
        rows,
        sum,
      };
      submit(payload, setErrors, setCategoryError);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {categoryError && <Form.Text>{categoryError}</Form.Text>}
        <FloatingLabel controlId="floatingCategory" label="Category">
          <Form.Control
            type="text"
            placeholder={category.category}
            value={category.category}
            name="category"
            onChange={(e) => {
              handleCategoryChange(e);
            }}
            required
          />
        </FloatingLabel>

        {rows.map((row, index) => (
          <div key={index}>
            <Form.Text>Item {index + 1}</Form.Text>
            <Row className="my-auto">
              <Col>
                <FloatingLabel controlId="floatingName" label="Name">
                  <Form.Control
                    type="text"
                    placeholder={row.name}
                    value={row.name}
                    name="name"
                    onChange={(e) => handleRowChange(index, e)}
                    required
                  />
                </FloatingLabel>
                {errors.name && (
                  <Form.Text className="text-danger">
                    {errors.name.message}
                  </Form.Text>
                )}
              </Col>

              <Col>
                <FloatingLabel controlId="floatingCost" label="Cost">
                  <Form.Control
                    type="text"
                    placeholder={row.cost}
                    value={row.cost}
                    name="cost"
                    onChange={(e) => handleRowChange(index, e)}
                    required
                  />
                </FloatingLabel>
                {errors.cost && (
                  <Form.Text className="text-danger">
                    {errors.cost.message}
                  </Form.Text>
                )}
              </Col>

              <Col className="my-auto">
                {index ? (
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => removeRow(index)}
                  >
                    Remove
                  </Button>
                ) : null}
              </Col>
            </Row>
          </div>
        ))}
        <Row className="p-3">
          <Col>
            <Button type="button" variant="success" onClick={() => addRow()}>
              Add Item Row
            </Button>
          </Col>
        </Row>
        <Row className="p-3">
          <Col>
            <Button type="submit">{buttonText}</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default InputForm;
