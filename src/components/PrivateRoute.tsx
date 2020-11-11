import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../services/firebase";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const location = useLocation();
  const [user, loading, error] = useAuthState(firebase.auth());

  console.log("PrivateRoute", user, loading, error);

  if (loading) return <div>loading</div>;
  return (
    <Route {...rest}>
      {user ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      )}
    </Route>
  );
};

export default PrivateRoute;
