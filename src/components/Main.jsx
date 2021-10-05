import React, { Component } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import FeedbackDetail from "./pages/FeedbackDetail";

class Main extends Component {
  state = {
    isLoaded: false,
    error: null,
    currentUser: {},
    productRequests: [],
    selectedRequest: {},
  };

  componentDidMount() {
    axios
      .get("data.json")
      .then((response) => {
        this.setState({
          isLoaded: true,
          currentUser: response.data["currentUser"],
          productRequests: response.data["productRequests"],
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      });
  }

  handleSelectRequest = (selectedRequest) => {
    this.setState({ selectedRequest });
  };

  render() {
    const { productRequests, selectedRequest } = this.state;

    return (
      <Switch>
        {/* The Switch decides which component to show based on the current URL.*/}
        <Route exact path="/not-found" component={NotFound}></Route>
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
              onSelectRequest={this.handleSelectRequest}
              {...props}
            />
          )}
        ></Route>
      </Switch>
    );
  }
}

export default Main;
