import React from "react";
import BackButton from "../common/BackButton";

const NewFeedback = () => {
  return (
    <div className="new-feedback-page">
      <div className="__top-group flex flex-ai-c flex-jc-sb">
        <BackButton />
      </div>
      <div className="create-new-feedback">
          <div className="__plus-circle">+</div>
          <h1 className="__header">Create New Feedback</h1>
          <form className="feedback-title">
              <span className="__header">Feedback Title</span>
              <label>Add a short, descriptive headline</label>
              <input type="text" />
          </form>
      </div>
    </div>
  );
};

export default NewFeedback;
