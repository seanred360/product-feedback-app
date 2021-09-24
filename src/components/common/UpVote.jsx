import React from "react";
import { GoChevronUp } from "react-icons/go";

const UpVote = (props) => {
  return (
    <div className="up-vote">
      <GoChevronUp
        onClick={props.onClick}
        style={{ cursor: "pointer" }}
        aria-hidden="true"
      />
      <span className="__quantity">99</span>
    </div>
  );
};

export default UpVote;
