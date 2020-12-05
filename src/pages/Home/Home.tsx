import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../../styledcomponents/wrapper";
import Header from "../../styledcomponents/header";
import { auth } from "../../services/firebase";
import { get_task_state } from "../../services/task";
import { newWeek, update_task_state } from "../../services/task";
import { current_week_score, createWeeks } from "./helper";

let Week: Function = (props: any) => {
  let data = useSelector((state: any) => state.weeks);

  if (!data) return null;

  return (
    <div className="container">
      {data.map((years: any, i: number) => {
        return (
          <div key={i} className="year_container">
            <div className="age">{i} - </div>
            {years.map((months: any, key: number) => (
              <div key={key} className="month_container">
                {months.map((weeks: any, key: number) => (
                  <div key={key} className="week_container">
                    {weeks.color === "white" ? (
                      <div
                        className="week"
                        style={{
                          backgroundColor: weeks.color
                        }}
                      ></div>
                    ) : (
                      <div
                        title={weeks.score}
                        className="week"
                        style={{
                          backgroundColor: weeks.color,
                          borderColor: weeks.color
                        }}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

const logout = () => {
  auth.signOut();
};

function Home() {
  let weeks = useSelector((state: any) => state.weeks);
  let task = useSelector((state: any) => state.task);
  const user = useSelector((state: any) => state.user);

  if (task) current_week_score(task);
  let dispatch = useDispatch();

  useEffect(() => {
    if (user)
      get_task_state(user.uid).then((r: any) =>
        dispatch({ type: "SET_TASK", payload: r })
      );
  }, [user, dispatch]);
  useEffect(() => {
    if (!weeks && task && user) {
      createWeeks(user.birthdate, task, user.uid).then(data =>
        dispatch({ type: "SET_WEEKS", payload: data })
      );
    }

    console.log("HOME");
  }, [task, dispatch, weeks, user]);
  useEffect(() => {
    if (weeks && task && user) {
      console.log(user, weeks, task);
      let res = newWeek(user.birthdate, user.uid, task);
      res.then(r => {
        if (r) {
          update_task_state(user.uid, { ...task });
          dispatch({ type: "SET_TASK", payload: { ...task } });
          console.log("FULL DATA LOADED", r);
        }
      });
    }
  }, [user, task, dispatch, weeks]);
  return (
    <Wrapper>
      <Header>
        <Link to="/tasks">
          <div className="tasks">Tasks</div>
        </Link>

        <div className="Title">MY LIFE IN WEEKS</div>

        <div
          className="logout"
          onClick={() => {
            console.log("logout");
            logout();
          }}
        >
          Logout
        </div>
      </Header>
      <Week></Week>
    </Wrapper>
  );
}

export default Home;
