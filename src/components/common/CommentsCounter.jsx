import React from "react";
import { FaComment } from "react-icons/fa";

const CommentsCounter = ({ commentsCount }) => {
  return (
    <div className="--counter-comments">
      <FaComment />
      <span className="--counter-count">{commentsCount}</span>
    </div>
  );
};

export default CommentsCounter;
