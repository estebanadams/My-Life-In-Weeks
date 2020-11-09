import React, { useState } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Wrapper from "../../styledcomponents/wrapper";
import Header from "../../styledcomponents/header";
import Day from "../../styledcomponents/day";

const FlexWrapper = styled.div`
  display: flex;
  overflow-x: auto;
`;

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
`;

const CheckTask = styled.div`
  border: 1px solid grey;
  margin: 10px;
  border-radius: 3px;
  text-align: left;
  display: flex;
  justify-content: space-between;
`;

const CreateNewTask = styled.input<{ show: boolean }>`
  ${props => !props.show && `display:none;`}
  border: 1px solid grey;
  padding: 10px;
  margin: 10px;
  border-radius: 3px;
`;

const DayTitle = styled.div`
  font-size: 36px;
  font-weight: 900;
  font-family: "PT serif";
  padding: 20px;
`;

const initialState = {
  task: {
    "task-1": { id: "task-1", content: "Read" },
    "task-2": { id: "task-2", content: "Workout" },
    "task-3": { id: "task-3", content: "Meditate" },
    "task-4": { id: "task-4", content: "Work" },
    "task-5": { id: "task-5", content: "Chill" }
  },
  tasksId: ["task-1", "task-2", "task-3", "task-4", "task-5"],
  days: [
    { title: "Monday", taskIds: ["task-1", "task-2"], tasks: [] },
    { title: "Tuesday", taskIds: ["task-1", "task-2"], tasks: [] },
    { title: "Wednesday", taskIds: ["task-1", "task-2"], tasks: [] },
    { title: "Thursday", taskIds: ["task-1", "task-2"], tasks: [] },
    { title: "Friday", taskIds: ["task-1", "task-2"], tasks: [] },
    { title: "Saturday", taskIds: ["task-1", "task-2"], tasks: [] },
    { title: "Sunday", taskIds: ["task-1", "task-2"], tasks: [] }
  ]
};

let handleEnterPress = (
  e: React.KeyboardEvent,
  state: any,
  setState: any,
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

    setState(newstate);
    setNewTask("");
    setShowNewTask(true);
  }
};

let Tasks = () => {
  let [showNewTask, setShowNewTask] = useState(true);
  let [newTask, setNewTask] = useState("");
  let [state, setState] = useState<any>(initialState);

  let { days, tasksId, task } = state;

  let onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    console.log(
      "dest",
      destination,
      "source",
      source,
      "Draggable",
      draggableId
    );

    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      let newtasklist = Array.from(
        state.days[parseInt(source.droppableId)].tasks
      );
      let tmp = newtasklist.splice(source.index, 1)[0];
      newtasklist.splice(destination.index, 0, tmp);
      state.days[parseInt(source.droppableId)].tasks = newtasklist;
      console.log(newtasklist);
      setState(state);
      return;
    }
    if (destination.droppableId === "tasks") return;
    if (source.droppableId !== "tasks") return;

    if (source) {
      let randomId =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);
      let t = {
        id: randomId,
        content: state.task[draggableId].content
      };
      state.days[parseInt(destination.droppableId)].taskIds.push(draggableId);
      state.days[parseInt(destination.droppableId)].tasks.push(t);
      console.log(t);
      setState(state);
      return;
    }
  };

  return (
    <Wrapper>
      <Header>Tasks</Header>
      <DragDropContext onDragEnd={onDragEnd}>
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
                        {task[t].content}
                      </Task>
                    )}
                  </Draggable>
                  // <Task key={key}>{task[t].content}</Task>
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
                setState,
                newTask,
                setNewTask,
                setShowNewTask
              )
            }
            show={!showNewTask}
          ></CreateNewTask>
        </TasksContainer>
        <FlexWrapper>
          {days.map((day: any, keys: number) => (
            <Day key={keys}>
              <DayTitle>{day.title}</DayTitle>
              <Droppable droppableId={keys.toString()}>
                {(provided: any) => (
                  <div
                    style={{ border: "1px solid red", height: "500px" }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {day.tasks.map((task: any, key: number) => (
                      <Draggable
                        draggableId={task.id}
                        index={key}
                        key={task.id}
                      >
                        {(provided: any) => (
                          <CheckTask
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div style={{ padding: "10px" }}>
                              {task.content}
                            </div>

                            <input
                              type="checkbox"
                              style={{
                                width: "25px",
                                height: "25px",
                                marginTop: "7px",
                                marginRight: "7px"
                              }}
                            />
                          </CheckTask>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Day>
          ))}
        </FlexWrapper>
      </DragDropContext>
    </Wrapper>
  );
};

export default Tasks;
