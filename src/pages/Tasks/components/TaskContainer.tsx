import React, { useState } from "react";

import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { FaTimesCircle } from "react-icons/fa";

const TasksContainer = styled.div`
  max-width: 100%;
  border: 1px solid red;
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
  state: any,
  // setState: any,
  newTask: string,
  setNewTask: any,
  setShowNewTask: any
) => {
  if (e.key === "Enter") {
    let newstate = { ...state };
    let newtaskId = "task-" + (state.tasksId.length + 1);
    console.log(newtaskId);
    newstate.task[newtaskId] = { id: newtaskId, content: newTask };
    newstate.tasksId.push(newtaskId);

    // setState(newstate);
    setNewTask("");
    setShowNewTask(true);
  }
};

type T_TaskContainer = {
  state: any;
};

let TaskContainer = ({ state }: T_TaskContainer) => {
  let [showNewTask, setShowNewTask] = useState(true);
  let [newTask, setNewTask] = useState("");

  let { tasksId, task } = state;

  return (
    <TasksContainer>
      <Droppable droppableId="tasks">
        {provided => (
          <div
            style={{ display: "flex" }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasksId.map((t: string, key: number) => (
              <Draggable draggableId={t} index={key} key={key}>
                {(provided: any) => (
                  <Task
                    key={key}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <DeleteTask>
                      <FaTimesCircle></FaTimesCircle>
                    </DeleteTask>
                    {task[t].content}
                  </Task>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

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
            state,
            // setState,
            newTask,
            setNewTask,
            setShowNewTask
          )
        }
        show={!showNewTask}
      ></CreateNewTask>
    </TasksContainer>
  );
};

export default TaskContainer;
