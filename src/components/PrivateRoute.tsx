import React, { useEffect } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../services/firebase";
import { useDispatch } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [user, loading] = useAuthState(firebase.auth());

  useEffect(() => {
    if (user) {
      dispatch({
        type: "SET_USER",
        payload: { uid: user.uid, email: user.email }
      });
    }
  }, [user, dispatch]);
  // console.log("PrivateRoute", user, loading, error);

  if (loading) return <div>Auth Loading</div>;

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
