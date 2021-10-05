import React, { Component } from "react";
import BackButton from "../common/BackButton";
import EditFeedbackButton from "../EditFeedbackButton";
import SuggestionBox from "../SuggestionBox";
import _ from "lodash";

class FeedbackDetail extends Component {
  render() {
    const { selectedRequest } = this.props;

    if (!selectedRequest) {
      this.props.history.push("/not-found");
      return null;
    }

    return (
      <div className="feedback-detail">
        <div className="__top-group flex flex-ai-c flex-jc-sb">
          <BackButton />
          <EditFeedbackButton />
        </div>
        <SuggestionBox
          title={selectedRequest["title"]}
          description={selectedRequest["description"]}
          category={selectedRequest["category"]}
          upvotes={selectedRequest["upvotes"]}
          commentsCount={_.size(selectedRequest["comments"])}
        />
      </div>
    );
  }
}

export default FeedbackDetail;
