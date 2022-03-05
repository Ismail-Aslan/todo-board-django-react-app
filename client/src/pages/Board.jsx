import React from "react";
import {
  Container
} from "react-bootstrap";
import BoardHeader from "../components/BoardHeader"
export default function Board() {
  return (
    <Container className="bg-primary bg-opacity-75" fluid>
      <BoardHeader/>
      <Container></Container>
    </Container>
  );
}
