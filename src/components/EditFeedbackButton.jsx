import { useHistory, useLocation } from "react-router-dom";

const EditFeedbackButton = ({ selectedProduct }) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <button
      className="all-buttons --blue-button"
      onClick={() =>
        history.push({
          pathname: `${location.pathname}/edit`,
          selectedProduct: selectedProduct,
        })
      }
    >
      Edit Feedback
    </button>
  );
};

export default EditFeedbackButton;
