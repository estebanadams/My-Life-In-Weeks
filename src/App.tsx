import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.scss";
import Home from "./pages/Home/Home";
import Tasks from "./pages/Tasks/Tasks";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  let result = useSelector(state => state);
  console.log(result);

  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <PrivateRoute path="/" component={Home} exact />
        <PrivateRoute path="/tasks" component={Tasks} />
      </Switch>
    </Router>
  );
}

export default App;
