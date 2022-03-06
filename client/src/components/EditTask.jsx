import React, { useRef } from "react";
import {
  Button,
  Form,
  FormControl,
  Row,
  Col,
  Modal,
} from "react-bootstrap";

export default function EditTask({
  show,
  handleClose,
  task,
  state,
  setState,
  columnId,
}) {

  const contentRef = useRef();
  const assignRef = useRef();
  const tagRef = useRef();
  const dateRef = useRef();
  const colorRef = useRef();
  
  function handleClick() {
    editTask(
      task.id,
      contentRef.current.value,
      assignRef.current.value,
      tagRef.current.value.length > 0 ? tagRef.current.value.split(",") : [],
      dateRef.current.value,
      colorRef.current.value
    );
  }

  function editTask(id, content, assignedTo, tags, dueDate, color) {
    const newTask = {
      id,
      content,
      assignedTo,
      tags: tags,
      dueDate,
      color,
    };

    setState({
      ...state,
      tasks: {
        ...state.tasks,
        [id]: newTask,
      },
    });
  }
  function handleMark() {
    const newTask = {
      id: task.id,
      content: contentRef.current.value,
      assignedTo: assignRef.current.value,
      tags:
        tagRef.current.value.length > 0 ? tagRef.current.value.split(",") : [],
      dueDate: dateRef.current.value,
      color: colorRef.current.value,
    };
    const oldTaskIds = state.columns[columnId].taskIds.filter(
      (el) => el !== task.id
    );

    const oldColumn = { ...state.columns[columnId], taskIds: oldTaskIds };

    const newTaskIds = state.columns[columnId].taskIds.includes(task.id)
      ? state.columns[columnId].taskIds
      : [...state.columns[columnId].taskIds, task.id];
    let newColumn;
    if (!!state.columns["column-0"]) {
      newColumn = { ...state.columns["column-0"], taskIds: newTaskIds };
    } else {
      newColumn = { id: "column-0", title: "Done", taskIds: [task.id] };
    }
    const newColumnOrder = state.columnOrder.includes("column-0")
      ? state.columnOrder
      : [...state.columnOrder, "column-0"];

    setState({
      ...state,
      tasks: {
        ...state.tasks,
        [task.id]: newTask,
      },

      columns: {
        ...state.columns,
        [columnId]: oldColumn,
        ["column-0"]: newColumn,
      },
      columnOrder: newColumnOrder,
    });
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Content:</Form.Label>
              <Form.Control
                id="content"
                ref={contentRef}
                defaultValue={task.content}
                type="text"
                placeholder="Add content..."
                aria-label="content"
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Assined To:</Form.Label>
              <FormControl
                id="assignedTo"
                ref={assignRef}
                defaultValue={task.assignedTo}
                type="text"
                placeholder="Assign to..."
                aria-label="assignedTo"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Tags:</Form.Label>
              <FormControl
                id="tags"
                ref={tagRef}
                defaultValue={task.tags}
                type="text"
                placeholder="Add tags..."
                aria-label="tags"
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Due Date:</Form.Label>
              <FormControl
                id="dueDate"
                ref={dateRef}
                defaultValue={task.dueDate}
                type="date"
                aria-label="dueDate"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Priority:</Form.Label>
              <Form.Select
                aria-label="color"
                id="color"
                ref={colorRef}
                defaultValue={task.color}
                className={"bg-" + task.color}
              >
                <option
                  value="secondary"
                  className="bg-secondary m-4 border rounded"
                >
                  Normal
                </option>
                <option
                  value="warning"
                  className="bg-warning m-1 border rounded"
                >
                  Low
                </option>
                <option value="danger" className="bg-danger m-1 border rounded">
                  Urgent
                </option>
              </Form.Select>
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleMark}>
            Mark As Done
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
