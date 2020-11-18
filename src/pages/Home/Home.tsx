import React, { useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../../styledcomponents/wrapper";
import Header from "../../styledcomponents/header";
import { auth } from "../../services/firebase";
import { get_task_state } from "../../services/task";
// import "./App.scss";

let current_week_score = (state: any) => {
  let day = moment().isoWeekday();
  console.log(state);
  let i = 0;

  let total_task = 0;
  let task_done = 0;
  while (i < day) {
    let j = 0;
    while (j < state.days[i].tasks.length) {
      if (state.days[i].tasks[j].checked) task_done++;
      total_task++;
      j++;
    }
    i++;
  }
  return Math.round((task_done / total_task) * 100);
};

let createWeeks = (birthdate: number[], task: any) => {
  const livespan = 100;
  let birth = moment(birthdate);
  let now = moment();
  let diff = now.diff(birth, "weeks");
  console.log(diff);
  let years = [];
  let i = 0;
  while (i < livespan) {
    let y = 0;
    let year = [];
    while (y < 48) {
      let j = 0;
      let month = [];
      while (j < 4) {
        let future = i * 52 + y + j > diff;
        let current_week = i * 52 + y + j == diff;
        if (future) month.push({ color: "white" });
        else if (current_week)
          month.push({ color: "#2ecc71" + current_week_score(task) });
        else month.push({ color: "grey" });
        j++;
      }
      year.push(month);
      y += 4;
    }
    years.push(year);
    i++;
  }
  console.log(years);
  return years;
};

let Week: Function = (props: any) => {
  let bornMonth = 8;
  let data = useSelector((state: any) => state.weeks);

  if (!data) return null;
  let monthName: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Otc",
    "Nov",
    "Dec"
  ];
  let arrangedMonthName = [];
  let i = 0;
  while (i < monthName.length) {
    if (bornMonth + i > monthName.length) bornMonth = -i + 1;
    arrangedMonthName.push(monthName[bornMonth + i - 1]);
    i++;
  }
  return (
    <div className="container">
      <div className="month_name">
        {arrangedMonthName.map((name, key) => {
          return <div key={key}>{name}</div>;
        })}
      </div>
      {data.map((years: any, i: number) => {
        return (
          <div key={i} className="year_container">
            <div className="age">{i} - </div>
            {years.map((months: any, key: number) => (
              <div key={key} className="month_container">
                {months.map((weeks: any, key: number) => (
                  <div key={key} className="week_container">
                    {weeks.color == "white" ? (
                      <div
                        className="week"
                        style={{
                          backgroundColor: weeks.color
                        }}
                      ></div>
                    ) : (
                      <div
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
  // return <div className="week"></div>;
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
  }, [user]);
  useEffect(() => {
    if (!weeks && task) {
      let data = createWeeks([1997, 8, 11], task);
      dispatch({ type: "SET_WEEKS", payload: data });
    }

    console.log("HOME");
  }, [task]);
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
