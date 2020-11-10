import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/Home";
import Tasks from "./pages/Tasks/Tasks";
import { Reset } from "styled-reset";

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
