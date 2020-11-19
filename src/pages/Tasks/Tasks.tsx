import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import { update_task_state, get_task_state } from "../../services/task";

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

let Tasks = () => {
  const state = useSelector((state: any) => state.task);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  console.log("USER", user, "DISTPATCH", state);
  useEffect(() => {
    if (user)
      get_task_state(user.uid).then((r: any) =>
        dispatch({ type: "SET_TASK", payload: r })
      );
  }, [user, dispatch]);

  useEffect(() => {
    if (user && state) update_task_state(user.uid, state);
  }, [state, user]);
  if (!state || !user) return null;
  let { days } = state;

  let onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (destination.droppableId === "tasks") return;

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
      // update_task_state(user.uid, state);
      dispatch({ type: "SET_TASK", payload: state });
      return;
    }

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
        content: state.task[parseInt(draggableId)].content,
        checked: false
      };
      state.days[parseInt(destination.droppableId)].tasks.splice(
        destination.index,
        0,
        t
      );
      console.log(t);
      dispatch({ type: "SET_TASK", payload: state });
      // update_task_state(user.uid, state);
      return;
    }
  };

  return (
    <Wrapper>
      <Header>
        <Link to="/">Home</Link>Tasks
      </Header>
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskContainer />

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
