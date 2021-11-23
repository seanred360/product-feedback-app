import React, { Component } from "react";
import _ from "lodash";
import Menu from "../Menu";
import SuggestionsEmpty from "../SuggestionsEmpty";
import SuggestionBox from "../SuggestionBox";

class HomePage extends Component {
  handleOnClick = (selectedRequest) => {
    this.props.onSelectRequest(selectedRequest);
    this.props.history.push("/feedback-detail");
  };

  render() {
    const { productRequests } = this.props;

    if (productRequests.length <= 0)
      return (
        <>
          <Menu />
          <SuggestionsEmpty />
        </>
      );

    return (
      <>
        <Menu />
        <div className="home-page">
          {productRequests.map((product) => (
            <SuggestionBox
              key={product["title"]}
              title={product["title"]}
              description={product["description"]}
              category={product["category"]}
              upvotes={product["upvotes"]}
              commentsCount={_.size(product["comments"])}
              onClickEvent={() => this.handleOnClick(product)}
            />
          ))}
        </div>
      </>
    );
  }
}

export default HomePage;
