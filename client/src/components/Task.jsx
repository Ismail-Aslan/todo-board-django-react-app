import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Container, Card ,Button} from "react-bootstrap";

function Task(props) {
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
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="my-2 shadow"
        >
          <Card.Header className="d-flex justify-content-between p-1 align-items-center">
           
            {props.task.content}
            <Button
              onClick={() =>
                deleteTask(props.columnId, props.index, props.task.id)
              }
              size="sm"
            >
              
              X
            </Button>
          </Card.Header>
          <Card.Body></Card.Body>
        </Card>
      )}
    </Draggable>
  );
}

export default Task;
