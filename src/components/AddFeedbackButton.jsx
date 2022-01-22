import React from "react";
import { useHistory } from "react-router";

const AddFeedbackButton = () => {
  let history = useHistory();

  function handleClick() {
    history.push("/new");
  }

  return (
    <button
      className="all-buttons --purple-button add-feedback-button"
      onClick={handleClick}
    >
      + Add Feedback
    </button>
  );
};

export default AddFeedbackButton;
