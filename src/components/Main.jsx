import React, { useEffect, useState } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import FeedbackDetail from "./pages/FeedbackDetail";
import NewFeedback from "./pages/NewFeedback";
import Spinner from "./common/Spinner";

const Main = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [productRequests, setProductRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState({});

  useEffect(() => {
    axios
      .get("data.json")
      .then((response) => {
        setIsLoaded(true);
        setCurrentUser(response.data["currentUser"]);
        setProductRequests(response.data["productRequests"]);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  if (!isLoaded) return <Spinner />;
  return (
    <Switch>
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path="/not-found" component={NotFound}></Route>
      <Route exact path="/new-feedback" component={NewFeedback}></Route>
      <Route
        exact
        path="/feedback-detail"
        render={(props) => (
          <FeedbackDetail selectedRequest={selectedRequest} {...props} />
        )}
      ></Route>
      <Route
        exact
        path="/"
        render={(props) => (
          <HomePage
            productRequests={productRequests}
            onSelectRequest={() => setSelectedRequest}
            {...props}
          />
        )}
      ></Route>
    </Switch>
  );
};

export default Main;
