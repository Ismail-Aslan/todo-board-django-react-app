import React, { useRef, useState } from "react";
import { Button, Form, FormControl, InputGroup, Modal } from "react-bootstrap";

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
    console.log(state);
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

    const newTaskIds = state.columns[columnId].taskIds.includes(task.id)?state.columns[columnId].taskIds: [...state.columns[columnId].taskIds,task.id]
    let newColumn
    if (!!state.columns["column-0"]) {
        
        newColumn = {  ...state.columns["column-0"], taskIds: newTaskIds };
    } else {
        newColumn = {  id:"column-0",title:"Done", taskIds: [task.id] };
        
    }
    const newColumnOrder = state.columnOrder.includes("column-0")
    ? state.columnOrder
    : [...state.columnOrder,"column-0"];
  
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
  //   function addNewTask(columnId, content) {
  //     const newTaskId = 'task-' + Math.floor(Math.random() * 100000);

  //     const column = props.state.columns[columnId];
  //     const newTaskIds = Array.from(column.taskIds);
  //     newTaskIds.push(newTaskId);

  //     const newTask = {
  //         id: newTaskId,
  //         content: content,
  //         color:"primary"
  //     }

  //     props.setState({...props.state,
  //         tasks: {
  //             ...props.state.tasks,
  //             [newTaskId]: newTask
  //         },
  //         columns: {
  //             ...props.state.columns,
  //             [columnId]: {
  //                 ...props.state.columns[columnId],
  //                 taskIds: newTaskIds
  //             }
  //         }
  //     });
  // }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <FormControl
            id="content"
            ref={contentRef}
            defaultValue={task.content}
            type="text"
            placeholder="Add content..."
            aria-label="content"
          />
          <FormControl
            id="assignedTo"
            ref={assignRef}
            defaultValue={task.assignedTo}
            type="text"
            placeholder="Assign to..."
            aria-label="assignedTo"
          />
          <FormControl
            id="tags"
            ref={tagRef}
            defaultValue={task.tags}
            type="text"
            placeholder="Add tags..."
            aria-label="tags"
          />
          <FormControl
            id="dueDate"
            ref={dateRef}
            defaultValue={task.dueDate}
            type="date"
            placeholder="Add due date..."
            aria-label="dueDate"
          />

          <Form.Select
            aria-label="color"
            id="color"
            ref={colorRef}
            defaultValue={task.color}
            // className="bg-primary"
            className={"bg-" + task.color}
          >
            <option value="primary" className="bg-primary m-4 border rounded">
              Normal{" "}
            </option>
            <option value="warning" className="bg-warning m-1 border rounded">
              Low
            </option>
            <option value="danger" className="bg-danger m-1 border rounded">
              Urgent
            </option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleMark}>
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
