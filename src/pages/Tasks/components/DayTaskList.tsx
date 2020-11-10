import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaTimesCircle } from "react-icons/fa";
import styled from "styled-components";

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

let DayTaskList = ({ dayKey, day }: T_DayTaskList) => {
  console.log("KEY", dayKey);
  return (
    <Droppable droppableId={dayKey.toString()}>
      {(provided: any) => (
        <div
          style={{ border: "1px solid red", height: "500px" }}
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
                  />
                  <div style={{ padding: "10px" }}>{task.content}</div>
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
  );
};

export default DayTaskList;
