import React from "react";
import { useHistory } from "react-router-dom";

const EditFeedbackButton = () => {
  const history = useHistory();

  return (
    <button
      className="all-buttons --blue-button"
      onClick={() => history.push("edit-feedback")}
    >
      Edit Feedback
    </button>
  );
};

export default EditFeedbackButton;
