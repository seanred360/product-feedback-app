import React from "react";
import PostFeedbackButton from "./PostFeedbackButton";

const RenderFeedbackEmpty = () => {
  return (
    <div className="feedback-empty">
      <div className="__inner-container flex flex-ai-c flex-jc-c">
        <div className="__not-found-image">
          <img
            src={
              process.env.PUBLIC_URL +
              "./starter-code/assets/suggestions/empty.svg"
            }
            alt="No feedback found"
          />
        </div>
        <span className="__header">There is no feedback yet.</span>
        <p>
          Got a suggestion? Found a bug that needs to be squashed? We love
          hearing about new ideas to improve our app.
        </p>
        <PostFeedbackButton />
      </div>
    </div>
  );
};

export default RenderFeedbackEmpty;
