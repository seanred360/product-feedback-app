import React from "react";
import { GoChevronUp } from "react-icons/go";

const UpVote = ({ onClick, upvotes }) => {
  return (
    <div className="up-vote">
      <GoChevronUp
        onClick={onClick}
        style={{ cursor: "pointer" }}
        aria-hidden="true"
      />
      <span className="__quantity">{upvotes}</span>
    </div>
  );
};

export default UpVote;
