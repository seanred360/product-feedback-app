import React from "react";
import Comment from "./Comment";

const CommentsSection = () => {
  return (
    <div className="comments-section">
      <h1 className="comments-count">4 Comments</h1>
      <Comment />
    </div>
  );
};

export default CommentsSection;
