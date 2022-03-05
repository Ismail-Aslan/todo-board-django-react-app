import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import AddColumn from "../components/AddColumn";

import BoardHeader from "../components/BoardHeader";
export default function Board() {
  const initialData = { tasks: {}, columns: {}, columnOrder: [] };
  const [state, setState] = useState(initialData);
  console.log(state);
  return (
    <Container className="bg-primary bg-opacity-75" fluid>
      <BoardHeader />

      <Container>
        <AddColumn state={state} setState={setState} />
      </Container>
    </Container>
  );
}
