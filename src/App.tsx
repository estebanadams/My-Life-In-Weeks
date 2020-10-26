import React from "react";
import moment from "moment";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/Home";
import Tasks from "./pages/Tasks/Tasks";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/tasks">
          <Tasks />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
