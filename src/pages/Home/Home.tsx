import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Wrapper from "../../styledcomponents/wrapper";
import Header from "../../styledcomponents/header";
// import "./App.scss";

let createWeeks = (birthdate: number[]) => {
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
        let future = i * 52 + y > diff;
        if (future) month.push({ color: "white" });
        else month.push({ color: "black" });
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

let Week: Function = (props: any): JSX.Element => {
  let bornMonth = 8;
  let data = createWeeks([1997, bornMonth, 11]);
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
      {data.map((years, i) => {
        return (
          <div key={i} className="year_container">
            <div className="age">{i} - </div>
            {years.map((months, key) => (
              <div key={key} className="month_container">
                {months.map((weeks, key) => (
                  <div key={key} className="week_container">
                    <div
                      className="week"
                      style={{ backgroundColor: weeks.color }}
                    ></div>
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

function Home() {
  return (
    <Wrapper>
      <Header>
        <Link to="/tasks">
          <div className="tasks">Tasks</div>
        </Link>
        <Link to="/">
          <div className="Title">MY LIFE IN WEEKS</div>
        </Link>
        <div className="logout">Logout</div>
      </Header>
      <Week></Week>
    </Wrapper>
  );
}

export default Home;
