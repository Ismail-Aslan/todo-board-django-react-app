import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BoardHeader({ headers }) {
  console.log(headers);
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .post("http://localhost:8000/user/logout",{}, headers)
      .then((res) => {
        localStorage.removeItem("Token");
        navigate("/login");
      })
      .catch((err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          navigate("/login");
        }
      });
  };
  return (
    <Container className="text-light">
      <Row className="d-flex align-items-center">
        <Col xs="6" className="d-flex align-items-center">
          <span className="h1">App Roadmap</span>
          <span className="h6 mx-3">
            <i className="far fa-star"></i>
          </span>
          <span className="h6">
            <i className="fas fa-briefcase"></i> Private
          </span>
        </Col>

        <Col xs="6" className="text-end">
          <span className="btn text-light" onClick={handleLogout}>Logout</span>
        </Col>
      </Row>
    </Container>
  );
}
