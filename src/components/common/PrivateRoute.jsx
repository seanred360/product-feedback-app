import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../custom-hooks/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/log-in" />
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;
