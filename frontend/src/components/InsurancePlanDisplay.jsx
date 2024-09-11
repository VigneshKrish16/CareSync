import React, { useEffect, useState } from "react";
import { Card, Button, Form, Row, Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InsurancePlanDisplay = () => {
  const [userId, setUserId] = useState("");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNext, setShowNext] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const func = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/insurance-plan/${localStorage.getItem(
            "UserID"
          )}`
        );
        setPlan(response.data);
        setShowNext(true);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch insurance plan");
      } finally {
        setLoading(false);
      }
    };
    func();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {/* <Form className="mb-3">
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            User ID:
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter User ID"
            />
          </Col>
          <Col sm="2">
            <Button onClick={fetchPlan} disabled={loading}>
              {loading ? "Loading..." : "Get Plan"}
            </Button>
          </Col>
        </Form.Group>
      </Form>
 */}
      {error && <p className="text-danger">{error}</p>}

      {plan && (
        <Card>
          <Card.Header as="h2">
            {plan["Company Name"]} - {plan["Plan Name"]}
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Plan Type:</strong> {plan["Plan Type"]}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Network Type:</strong> {plan["Network Type"]}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Monthly Premium:</strong> ₹{plan["Monthly Premium"]}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Annual Premium:</strong> ₹{plan["Annual Premium"]}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Sum Insured:</strong> ₹{plan["Sum Insured"]}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Deductible:</strong> {plan["Deductible"]}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Out-of-Pocket Maximum:</strong>{" "}
                {plan["Out-of-Pocket Maximum"]}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Copayments:</strong>
                <ul>
                  {Object.entries(plan["Copayments"]).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Coverage Details:</strong>
                <ul>
                  {plan["Coverage Details"].map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Additional Benefits:</strong>
                <ul>
                  {plan["Additional Benefits"].map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Policy Number:</strong> {plan["Policy Number"]}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Effective Date:</strong> {plan["Effective Date"]}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Expiration Date:</strong> {plan["Expiration Date"]}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>General Exclusions:</strong>
                <ul>
                  {plan["General Exclusions"].map((exclusion, index) => (
                    <li key={index}>{exclusion}</li>
                  ))}
                </ul>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Waiting Periods:</strong>
                <ul>
                  {Object.entries(plan["Waiting Periods"]).map(
                    ([key, value]) => (
                      <li key={key}>
                        {key}: {value} days
                      </li>
                    )
                  )}
                </ul>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      )}
      {showNext && (
        <Button
          onClick={() => {
            navigate("/home/plan/visuals");
          }}
          disabled={loading}
        >
          Visualize
        </Button>
      )}
    </div>
  );
};

export default InsurancePlanDisplay;
