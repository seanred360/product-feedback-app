import React, { Component } from "react";
import SuggestionBox from "../SuggestionBox";
import axios from "axios";
import _ from "lodash";
import SuggestionsEmpty from "../SuggestionsEmpty";

class HomePage extends Component {
  state = {
    isLoaded: false,
    error: null,
    currentUser: {},
    productRequests: [],
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

  render() {
    const { productRequests } = this.state;

    if (productRequests.length <= 0) return <SuggestionsEmpty />;

    return (
      <div className="home-page">
        {productRequests.map((product) => (
          <SuggestionBox
            key={product["title"]}
            title={product["title"]}
            description={product["description"]}
            category={product["category"]}
            upvotes={product["upvotes"]}
            commentsCount={_.size(product["comments"])}
          />
        ))}
      </div>
    );
  }
}

export default HomePage;
