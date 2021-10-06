import React from "react";
import Comment from "./Comment";

const CommentsSection = ({ comments }) => {
  return (
    <div className="comments-section">
      <h1 className="comments-count">4 Comments</h1>
      {comments.map((comment) => (
        <Comment
          key={comment["content"]}
          userImage={comment["user"]["image"]}
          userName={comment["user"]["name"]}
          userAlias={comment["user"]["username"]}
          content={comment["content"]}
        />
      ))}
      {/* <Comment comments={comments} /> */}
    </div>
  );
};

export default CommentsSection;
