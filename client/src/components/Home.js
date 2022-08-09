import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Carousel from "react-bootstrap/Carousel";

const Home = () => {
  const popover = (
    <Popover id="popoverQ1">
      <Popover.Header as="h3">Answer</Popover.Header>
      <Popover.Body>
        <strong>30%</strong> of your income or below
      </Popover.Body>
    </Popover>
  );

  return (
    <Container>
      <Row>
        <Col>
          <h3 className="text-danger">Login to Calculate</h3>
        </Col>
        <Col>
          <a href="https://www.profitwell.com/recur/all/total-expenses">
            How to calculate/manage your total expenses
          </a>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Question: How much of your income should you spend on rent?</p>
        </Col>
        <Col>
          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <Button variant="success">Reveal Answer</Button>
          </OverlayTrigger>
        </Col>
      </Row>
      <Row>
        <Col>
          <Carousel fade>
            <Carousel.Item>
              <img
                src={require("../assets/calculator.jpg")}
                alt="calculator"
                style={{ width: "10em", height: "10em" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src={require("../assets/cash.jpg")}
                alt="cash"
                style={{ width: "10em", height: "10em" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src={require("../assets/calculating.jpg")}
                alt="calculating"
                style={{ width: "10em", height: "10em" }}
              />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
