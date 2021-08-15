import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function SemiProtectedRoute({ children, ...rest }) {
  const { isAuth, user } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !isAuth ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : isAuth && !user.activated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/rooms",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

export default SemiProtectedRoute;
