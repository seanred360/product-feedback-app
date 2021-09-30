import React from "react";
import AddFeedbackButton from "../AddFeedbackButton";
import empty from "../../starter-code/assets/suggestions/empty.svg";

const SuggestionsEmpty = () => {
  return (
    <div className="suggestions-empty">
      <div className="__inner-container flex flex-ai-c flex-jc-c">
        <div className="__not-found-image">
          <img src={empty} alt="No feedback found" />
        </div>
        <span className="__header">There is no feedback yet.</span>
        <p>
          Got a suggestion? Found a bug that needs to be squashed? We love
          hearing about new ideas to improve our app.
        </p>
        <AddFeedbackButton />
      </div>
    </div>
  );
};

export default SuggestionsEmpty;
