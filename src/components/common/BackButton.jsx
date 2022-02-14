import React from "react";
import { useHistory } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";

const BackButton = () => {
  const history = useHistory();

  return (
    <button
      className="all-buttons --back-button"
      onClick={() => history.push("/")}
    >
      <GoChevronLeft />
      Go Back
    </button>
  );
};

export default BackButton;
