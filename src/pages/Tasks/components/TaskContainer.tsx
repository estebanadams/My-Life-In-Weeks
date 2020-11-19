import React, { useState } from "react";

import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { FaTimesCircle } from "react-icons/fa";

const TasksContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const AddTask = styled.div<{ show: boolean }>`
  ${props => !props.show && `display:none;`}
  color: white;
  background-color: black;
  padding: 10px;
  margin: 10px;
  border-radius: 3px;
  font-weight: 600;
`;

const Task = styled.div`
  border: 1px solid grey;
  padding: 10px;
  margin: 10px;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
`;

const DeleteTask = styled.div`
  padding-right: 10px;
`;

const CreateNewTask = styled.input<{ show: boolean }>`
  ${props => !props.show && `display:none;`}
  border: 1px solid grey;
  padding: 10px;
  margin: 10px;
  border-radius: 3px;
`;

let handleEnterPress = (
  e: React.KeyboardEvent,
  uid: string,
  state: any,
  dispatch: any,
  newTask: string,
  setNewTask: any,
  setShowNewTask: any
) => {
  if (e.key === "Enter") {
    let newstate = { ...state };
    let newtaskId = "task-" + (state.task.length + 1);
    console.log(newtaskId);
    newstate.task.push({ id: newtaskId, content: newTask });
    // newstate.tasksId.push(newtaskId);

    dispatch({ type: "SET_TASK", payload: newstate });
    setNewTask("");
    setShowNewTask(true);
  }
};

let removeTask = (dispatch: any, key: number, state: any) => {
  state.task.splice(key, 1);
  console.log("STAte", state.task);
  dispatch({ type: "SET_TASK", payload: state });
};

type T_TaskContainer = {
  state: any;
  setState: any;
};

let TaskContainer = () => {
  let [showNewTask, setShowNewTask] = useState(true);
  let [newTask, setNewTask] = useState("");
  const state = useSelector((state: any) => state.task);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  let { task } = state;

  return (
    <>
      <Droppable droppableId="tasks">
        {provided => (
          <TasksContainer
            style={{ display: "flex" }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {task.map((t: any, key: number) => (
              <Draggable draggableId={key.toString()} index={key} key={key}>
                {(provided: any) => (
                  <Task
                    key={key}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <DeleteTask
                      onClick={() => removeTask(dispatch, key, state)}
                    >
                      <FaTimesCircle></FaTimesCircle>
                    </DeleteTask>
                    {t.content}
                  </Task>
                )}
              </Draggable>
            ))}
            {provided.placeholder}

            <AddTask
              onClick={() => {
                setShowNewTask(false);
              }}
              show={showNewTask}
            >
              + NEW TASK +
            </AddTask>
            <CreateNewTask
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              onKeyPress={e =>
                handleEnterPress(
                  e,
                  user.uid,
                  state,
                  dispatch,
                  newTask,
                  setNewTask,
                  setShowNewTask
                )
              }
              show={!showNewTask}
            ></CreateNewTask>
          </TasksContainer>
        )}
      </Droppable>
    </>
  );
};

export default TaskContainer;
