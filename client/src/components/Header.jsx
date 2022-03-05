import React from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Nav,
  Button,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="primary" variant="light" expand="lg">
      <Container fluid>
        <Row className="w-100 mx-auto">
          <Col md={{ span: 5, order: 1 }} xs={{ order: 2 }} className="my-md-0 my-3">
            <Container className="p-0" fluid>
              <Row>
              <Col xs="1">
                <Button>
                  <i className="fas fa-arrow-left"></i>
                </Button>
              </Col>
              <Col md="3" xs="4">
                <Button className="outline-light">
                 <i className="fas fa-tachometer-alt"/> Boards
                </Button>
              </Col>
              <Col md="8" xs="7" className="p-0">
                <Form className="d-flex border rounded">
                  <InputGroup className="border-0">
                    <FormControl
                      type="search"
                      placeholder="Search"
                      className="bg-light bg-opacity-50 border-0"
                      aria-label="Search"
                    />
                    <Button className="bg-light bg-opacity-50  border-0">
                      <i className="fas fa-search text-dark"></i>
                    </Button>
                  </InputGroup>
                </Form>
              </Col>
              </Row>
            </Container>
          </Col>
          <Col md={{ span: 5, order: 2 }} xs={{ order: 1 }} className="pt-1">
            <h5 className="m-auto text-center text-light">Webix Boards</h5>
          </Col>
          <Col md={{ span: 2, order: 3 }} xs={{ order: 3 }} className="text-center text-md-end">
            <Button className=" outline-light">
              <i className="fas fa-plus"></i>
            </Button>
            <Button className="outline-light">
              <i className="far fa-question-circle"></i>
            </Button>
            <Button className="outline-light">
              <i className="far fa-bell"></i>
            </Button>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}
