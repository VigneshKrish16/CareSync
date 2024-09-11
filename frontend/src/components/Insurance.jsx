import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import InsurancePlanDisplay from "./InsurancePlanDisplay.jsx";
import "../styles/insurance.css";
/* import "bootstrap/dist/css/bootstrap.min.css";
 */
function Insurance() {
  return (
    <Container className="my-container mt-5">
      <Row>
        <Col>
          <h1 className="my-heading">
            AI-Driven Health Insurance Plan Generator
          </h1>
          <InsurancePlanDisplay />
        </Col>
      </Row>
    </Container>
  );
}

export default Insurance;
