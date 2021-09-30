import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NoFeedback from "./pages/NoFeedback";
import NotFound from "./pages/NotFound";

const Main = () => {
  return (
    <Switch>
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path="/not-found" component={NotFound}></Route>
      <Route exact path="/" component={NoFeedback}></Route>
      {/* <Route exact path="/" component={HomePage}></Route> */}
    </Switch>
  );
};

export default Main;
