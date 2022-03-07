import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Column from "../components/Column";
import AddColumn from "../components/AddColumn";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import BoardHeader from "../components/BoardHeader";

export default function Board({ token }) {
  const navigate = useNavigate();
  const initialData = {
    tasks: {
      
    },
    columns: {
     
    },
    columnOrder: [],
  };
  const [state, setState] = useState(initialData);
  useEffect(async () => {
    const data = await getBoardData();
    setState(data);
  }, [token]);

  useEffect(() => {
    if (state !== initialData) {
      saveBoard();
    }
  }, [state]);
  const headers = {
    headers: { Authorization: "Token " + token },
  };
  async function saveBoard() {
    await axios.post("/api/tasks", state.tasks, headers);
    await axios.post("/api/columns", state.columns, headers);
    await axios.post(
      "/api/board",
      {
        columnOrder: state.columnOrder,
      },
      headers
    );
  }

  async function getBoardData() {
    try {
      const tasksRes = await axios.get("/api/tasks", headers);
      const columnsRes = await axios.get("/api/columns", headers);
      const boardsRes = await axios.get("/api/board", headers);
      const tasks = {};
      const columns = {};
      tasksRes.data.map((el) => (tasks[el.id] = el));
      columnsRes.data.map((el) => (columns[el.id] = el));
      const data = {
        tasks,
        columns,
        columnOrder: boardsRes.data[0].columnOrder,
      };
      console.log(data);
      return data;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        navigate("/login");
      }
    }
  }

  function onDragEnd(result) {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setState({
        ...state,
        columnOrder: newColumnOrder,
      });
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setState({
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    setState({
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  }
  return (
    <Container
      className="bg-primary bg-opacity-75"
      style={{ height: "min-content" }}
      fluid
    >
      <BoardHeader headers={headers} />

      <DragDropContext onDragEnd={onDragEnd}>
        <AddColumn state={state} setState={setState} />
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="d-flex flex-nowrap overflow-auto pb-3"
              style={{ height: "80vh" }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {state?.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => state.tasks[taskId]
                );
                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    index={index}
                    state={state}
                    setState={setState}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}
