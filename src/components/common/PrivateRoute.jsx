import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../custom-hooks/AuthContext";

const PrivateRoute = ({ component: Component, isPublic = false, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <>
      {isPublic ? (
        <Route
          {...rest}
          render={({ location }) => {
            return currentUser ? (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: location },
                }}
              />
            ) : (
              <Component {...location} />
            );
          }}
        />
      ) : (
        <Route
          {...rest}
          render={({ location }) => {
            return currentUser ? (
              <Component {...location} />
            ) : (
              <Redirect
                to={{
                  pathname: "/log-in",
                  state: { from: location },
                }}
              />
            );
          }}
        />
      )}
    </>
  );
};

export default PrivateRoute;
