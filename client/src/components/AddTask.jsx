import React, { useState } from "react";
import {
 
    Button,
    Form,
    FormControl,
    InputGroup,
  } from "react-bootstrap";

export default function AddTask(props) {
  const [value, setValue] = useState("");
  function handleInputChange(event) {
    setValue(event.target.value);
  }
  function handleClick() {
    console.log(value);
    if (value !== "") {
      addNewTask(props.columnId, value);
      setValue("");
    }
  }

  function addNewTask(columnId, content) {
    const newTaskId = 'task-' + Math.floor(Math.random() * 100000);

    const column = props.state.columns[columnId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.push(newTaskId);

    const newTask = {
        id: newTaskId,
        content: content,
    }

    props.setState({...props.state,
        tasks: {
            ...props.state.tasks,
            [newTaskId]: newTask
        },
        columns: {
            ...props.state.columns,
            [columnId]: {
                ...props.state.columns[columnId],
                taskIds: newTaskIds
            }
        }
    });
}
  return (
    <Form className="d-flex border rounded my-2">
      <InputGroup className="border-0">
        <FormControl
          onChange={handleInputChange}
          value={value}
          type="text"
          placeholder="Add new task..."
          className="bg-light bg-opacity-50 border-0"
          aria-label="column"
        />
        <Button
          className="bg-light bg-opacity-50  border-0 text-dark"
          onClick={handleClick}
        >
          <i className="fas fa-plus"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
