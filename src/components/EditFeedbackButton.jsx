import { useHistory, useLocation } from "react-router-dom";

const EditFeedbackButton = ({ selectedFeedback }) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <button
      className="all-buttons --blue-button"
      onClick={() =>
        history.push({
          pathname: `/edit${location.pathname}`,
          selectedFeedback: selectedFeedback,
        })
      }
    >
      Edit Feedback
    </button>
  );
};

export default EditFeedbackButton;
