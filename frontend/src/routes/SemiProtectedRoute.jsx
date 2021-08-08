import React from "react";
import { Redirect, Route } from "react-router-dom";

const isAuth = true;
const user = {
  activated: false,
};

function SemiProtectedRoute({ children, ...rest }) {
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
