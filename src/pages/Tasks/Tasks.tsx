import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import Wrapper from "../../styledcomponents/wrapper";
import Header from "../../styledcomponents/header";
import Day from "../../styledcomponents/day";
import DayTaskList from "./components/DayTaskList";
import TaskContainer from "./components/TaskContainer";

const FlexWrapper = styled.div`
  display: flex;
  overflow-x: auto;
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

let Tasks = () => {
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
        <TaskContainer state={state} />

        <FlexWrapper>
          {days.map((day: any, key: number) => (
            <Day key={key}>
              <DayTitle>{day.title}</DayTitle>
              <DayTaskList dayKey={key} day={day} />
            </Day>
          ))}
        </FlexWrapper>
      </DragDropContext>
    </Wrapper>
  );
};

export default Tasks;
