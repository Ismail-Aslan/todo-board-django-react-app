import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Tooltip,
  Card,
  OverlayTrigger,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import EditTask from "./EditTask";
function Task(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function deleteTask(columnId, index, taskId) {
    const column = props.state.columns[columnId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(index, 1);

    const tasks = props.state.tasks;
    const { [taskId]: oldTask, ...newTasks } = tasks;

    props.setState({
      ...props.state,
      tasks: {
        ...newTasks,
      },
      columns: {
        ...props.state.columns,
        [columnId]: {
          ...column,
          taskIds: newTaskIds,
        },
      },
    });
  }

  return (
    <>
      <EditTask
        show={show}
        handleClose={handleClose}
        task={props.task}
        state={props.state}
        setState={props.setState}
        columnId={props.columnId}
      />
      <Draggable draggableId={props.task.id} index={props.index}>
        {(provided) => (
          <Card
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="my-2 shadow"
          >
            <div className={"border-start border-3 rounded border-"+ props.task.color }>
              <Card.Header className="d-flex justify-content-between p-1 align-items-center">
                {props.task.content}

                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      {props.task.assignedTo
                        ? props.task.assignedTo
                        : "Not asigned!"}
                    </Tooltip>
                  }
                >
                  <i
                    className={
                      props.task.assignedTo
                        ? "fa-solid fa-circle-user text-primary"
                        : "fa-solid fa-circle-user"
                    }
                  ></i>
                </OverlayTrigger>
              </Card.Header>
              <Card.Body className="p-1 d-flex justify-content-between align-items-center">
                <div>
                  {props.task.tags
                    ? props.task.tags.map((el, idx) => {
                        return (
                          <Button
                            disabled
                            size="sm"
                            className="me-1 rounded-3 p-0"
                            key={idx}
                          >
                            {el}
                          </Button>
                        );
                      })
                    : ""}
                </div>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Edit</Tooltip>}
                >
                  <i className="fa-solid fa-pencil" onClick={handleShow}></i>
                </OverlayTrigger>
              </Card.Body>
              <Card.Footer className="small p-1">
                {!!props.task.dueDate && "Due Date:" + props.task.dueDate}
              </Card.Footer>
            </div>
          </Card>
        )}
      </Draggable>
    </>
  );
}

export default Task;
