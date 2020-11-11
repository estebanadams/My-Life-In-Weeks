import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const location = useLocation();

  return (
    <Route {...rest}>
      {false ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      )}
    </Route>
  );
};

export default PrivateRoute;
