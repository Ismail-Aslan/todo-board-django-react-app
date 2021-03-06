import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Container, Card } from "react-bootstrap";
import Task from "./Task";
import AddTask from "./AddTask";
import DeleteModal from "./DeleteModal";
function Column(props) {
  const [showModal, setShowModal] = useState(false);
  function deleteColumn() {
    const columnTasks = props.state.columns[props.column.id].taskIds;

    const finalTasks = columnTasks.reduce((previousValue, currentValue) => {
      const { [currentValue]: oldTask, ...newTasks } = previousValue;
      return newTasks;
    }, props.state.tasks);

    const columns = props.state.columns;
    const { [props.column.id]: oldColumn, ...newColumns } = columns;

    const newColumnOrder = Array.from(props.state.columnOrder);
    newColumnOrder.splice(props.index, 1);

    props.setState({
      tasks: {
        ...finalTasks,
      },
      columns: {
        ...newColumns,
      },
      columnOrder: newColumnOrder,
    });
  }

  return (
    <>
      <DeleteModal
        show={showModal}
        setShow={setShowModal}
        handleDelete={deleteColumn}
        type="column"
      />
      <Draggable draggableId={props.column.id} index={props.index}>
        {(provided) => (
          <div style={{ height: "min-content", minWidth: "280px" }}>
            <Card
              {...provided.draggableProps}
              ref={provided.innerRef}
              className="mx-2"
            >
              <Card.Header
                {...provided.dragHandleProps}
                className="d-flex justify-content-between"
              >
                <span>{props.column.title}</span>
                <span onClick={() => setShowModal(true)}>X</span>
              </Card.Header>
              <Card.Body>
                <Droppable droppableId={props.column.id} type="task">
                  {(provided) => (
                    <Container
                      className="d-flex flex-column border border-white overflow-auto"
                      style={{ maxHeight: "55vh" }}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      fluid
                    >
                      {props.tasks.map((task, index) => (
                        <Task
                          key={task.id}
                          task={task}
                          index={index}
                          columnId={props.column.id}
                          state={props.state}
                          setState={props.setState}
                        />
                      ))}
                      {provided.placeholder}
                    </Container>
                  )}
                </Droppable>
              </Card.Body>
              <Card.Footer>
                <AddTask
                  columnId={props.column.id}
                  state={props.state}
                  setState={props.setState}
                />
              </Card.Footer>
            </Card>
          </div>
        )}
      </Draggable>
    </>
  );
}

export default Column;
