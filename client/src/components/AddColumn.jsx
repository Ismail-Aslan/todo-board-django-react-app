import React, { useState, useRef } from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";

export default function AddColumn(props) {
  const [value, setValue] = useState("");
  function handleInputChange(event) {
    setValue(event.target.value);
  }
  function handleClick() {
    console.log(value);
    if (value !== "") {
        addNewColumn(value)
      setValue("");
    }
  }

  function addNewColumn(title) {
    const newColumnOrder = Array.from(props.state.columnOrder);
    const newColumnId = "column-" + Math.floor(Math.random() * 100000);
    newColumnOrder.push(newColumnId);
    const newColumn = {
      id: newColumnId,
      title: title,
      taskIds: [],
    };
    props.setState({
      ...props.state,
      columnOrder: newColumnOrder,
      columns: {
        ...props.state.columns,
        [newColumnId]: newColumn,
      },
    });
  }
  return (
    <Form className="d-flex border rounded my-2">
      <InputGroup className="border-0">
        <FormControl
          onChange={handleInputChange}
          value={value}
          type="text"
          placeholder="Add new column..."
          className="bg-light bg-opacity-50 border-0"
          aria-label="column"
        />
        <Button
          className="bg-light bg-opacity-50  border-0"
          onClick={handleClick}
        >
          <i className="fas fa-plus"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
