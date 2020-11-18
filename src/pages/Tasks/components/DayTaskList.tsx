import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaTimesCircle } from "react-icons/fa";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const CheckTask = styled.div`
  border: 1px solid grey;
  margin: 10px;
  border-radius: 3px;
  text-align: left;
  display: flex;
  justify-content: space-between;
`;

type T_DayTaskList = {
  dayKey: number;
  day: any;
};

let remove_task = (
  day_key: number,
  task_key: number,
  state: any,
  dispatch: any
) => {
  console.log("REMOVE ITEM 1", state.days[day_key].tasks);
  state.days[day_key].tasks.splice(task_key, 1);
  console.log("REMOVE ITEM 2", state.days[day_key].tasks);
  dispatch({ type: "SET_TASK", payload: state });
};

let handle_checkbox = (
  state: any,
  dispatch: any,
  day_key: number,
  task_key: number
) => {
  state.days[day_key].tasks[task_key].checked = !state.days[day_key].tasks[
    task_key
  ].checked;
  dispatch({ type: "SET_TASK", payload: state });
};

let DayTaskList = ({ dayKey, day }: T_DayTaskList) => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.task);
  return (
    <Droppable droppableId={dayKey.toString()}>
      {(provided: any) => (
        <div
          style={{ height: "700px" }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {day.tasks.map((task: any, key: number) => (
            <Draggable draggableId={task.id} index={key} key={task.id}>
              {(provided: any) => (
                <CheckTask
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <FaTimesCircle
                    size="25px"
                    style={{ marginTop: "7px", marginLeft: "7px" }}
                    onClick={() => {
                      remove_task(dayKey, key, state, dispatch);
                    }}
                  />
                  <div style={{ padding: "10px" }}>{task.content}</div>
                  <input
                    type="checkbox"
                    checked={task.checked}
                    onChange={e =>
                      handle_checkbox(state, dispatch, dayKey, key)
                    }
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
  );
};

export default DayTaskList;
