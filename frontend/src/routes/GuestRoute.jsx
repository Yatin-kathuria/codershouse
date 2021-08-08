import React from "react";
import { Redirect, Route } from "react-router-dom";

function GuestRoute({ children, ...rest }) {
  const isAuth = false;
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuth ? (
          <Redirect
            to={{
              pathname: "/rooms",
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

export default GuestRoute;
