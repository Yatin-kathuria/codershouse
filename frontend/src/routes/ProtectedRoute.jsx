import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ children, ...rest }) {
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
          <Redirect
            to={{
              pathname: "/activate",
              state: { from: location },
            }}
          />
        ) : (
          children
        );
      }}
    />
  );
}

export default ProtectedRoute;
