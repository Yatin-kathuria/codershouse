import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function GuestRoute({ children, ...rest }) {
  const { isAuth } = useSelector((state) => state.auth);

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
