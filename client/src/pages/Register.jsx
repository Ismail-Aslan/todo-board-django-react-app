import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate,Link } from "react-router-dom";

export default function Register() {
  const [showPass, setShowPass] = useState(false);
 

  const email = useRef();
  const password = useRef();
  const name = useRef();
  const surname = useRef();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit");
  };
  return (
    <Container className="bg-info bg-opacity-25 pt-5 min-vh-100" fluid>
      <Row className="bg-light rounded w-75 mx-auto align-items-center shadow-lg">
        <Col
          className="rounded-start px-3 pt-5 pb-3 m-0"
          lg="5"
          md="6"
          xs="12"
        >
          <Row className="text-dark text-center mb-4">
            <h3>Welcome!</h3>
            <h5>Register to ToDo Board</h5>
          </Row>
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="text-dark">Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              ref={name}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please write your name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-dark">Surname:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your surname"
              ref={surname}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please write your surname.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-dark">Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              ref={email}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please write your email address.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-dark">Password:</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPass ? "text" : "password"}
                placeholder="Password"
                ref={password}
                required
              />
              <InputGroup.Text>
                <i
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
                  className={showPass ? "fas fa-eye-slash" : "fas fa-eye"}
                ></i>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Row className="text-center">
            <Button className="w-50 mx-auto" variant="primary" type="submit">
              Register
            </Button>
          </Row>
        </Form>
        <p className="text-center mt-3">Have already an account? <Link to="/login">Login Here</Link></p>
        </Col>
        <Col
        className="rounded-end p-0 m-0"
        lg="7"
        md="6"
        >
          <img  className="rounded-end m-0" src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login" width="100%" height="100%" />
        </Col>
      </Row>
    </Container>
  );
}
