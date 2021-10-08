import React from "react";
import Comment from "./Comment";

const CommentsSection = ({ commentsCount, comments }) => {
  return (
    <div className="comments-section">
      <h1 className="comments-count">{commentsCount} Comments</h1>
      {comments && comments.map((comment) => (
        <Comment
          key={comment["content"]}
          userImage={comment["user"]["image"]}
          userName={comment["user"]["name"]}
          userAlias={comment["user"]["username"]}
          content={comment["content"]}
          replies={comment['replies']}
        />
      ))}
    </div>
  );
};

export default CommentsSection;
