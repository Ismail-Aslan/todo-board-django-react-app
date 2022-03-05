import React from 'react'
import {
    Container,
    Row,
    Col,
   
  } from "react-bootstrap";
export default function BoardHeader() {
  return (
    <Container className="text-light">
        <Row className="d-flex align-items-center">
          <Col xs="6" className="d-flex align-items-center">
            <span className="h1">App Roadmap</span>
            <span className="h6 mx-3">
              <i class="far fa-star"></i>
            </span>
            <span className="h6">
              <i class="fas fa-briefcase"></i> Private
            </span>
          </Col>

          <Col xs="6" className="text-end">
            <i class="fa-solid fa-minus"></i> Show Menu
          </Col>
        </Row>
      </Container>
  )
}
