import React from "react";
import { useLocation } from "react-router";
import BackButton from "../common/BackButton";

const NewFeedback = () => {
  const items = ["Feature", "UI", "US", "Enhancement", "Bug"];
  const location = useLocation();

  return (
    <div className="new-feedback-page">
      <div className="__top-group flex flex-ai-c flex-jc-sb">
        <BackButton />
      </div>
      <div className="create-new-feedback">
        <div className="__plus-circle">+</div>
        <h1 className="__header">
          {location.pathname == `/edit-feedback`
            ? `Editing${" insert feedback name here"}`
            : `Create New Feedback`}
        </h1>

        <form id="__feedback-title" className="__feedback-title">
          <label className="__title" htmlFor="__feedback-title">
            Feedback Title
          </label>
          <br />
          <span className="__instructions">
            Add a short, descriptive headline
          </span>
          <textarea
            name="__feedback-title-input"
            id="__feedback-title-input"
            cols="30"
            rows="10"
          />
        </form>

        <form>
          <label className="__title" htmlFor="__feedback-category">
            Category
          </label>
          <br />
          <span className="__instructions">
            Choose a category for your feedback
          </span>
          <select id="__feedback-category">
            {items.map((item) => (
              <option
                className="__dropdown-item"
                key={item + "option"}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </form>

        <form className="__feedback-detail">
          <label className="__title" htmlFor="__feedback-category">
            Feedback Detail
          </label>
          <br />
          <span className="__instructions">
            Include any specific comments on what should be improved, added,
            etc.
          </span>
          <textarea
            name="__feedback-detail-input"
            id="__feedback-detail-input"
            cols="30"
            rows="10"
          />
        </form>

        <div className="__buttons flex flex-jc-c flex-ai-c">
          <button className="all-buttons --purple-button">
            {location.pathname == "/edit-feedback"
              ? "Save Changes"
              : "Add Feedback"}
          </button>
          <button className="all-buttons --blue-grey2-button">Cancel</button>
          <button
            className="all-buttons --red-button"
            style={
              location.pathname == "/edit-feedback"
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewFeedback;
