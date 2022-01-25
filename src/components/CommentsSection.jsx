import React from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";

const CommentsSection = ({ commentsCount, comments }) => {
  return (
    <React.Fragment>
      <div className="comments-section">
        <div className="comments">
          <h1 className="comments-count">{commentsCount} Comments</h1>
          {comments &&
            comments.map((comment) => (
              <Comment
                key={comment["content"] + "1231312"}
                userImage={comment["user"]["image"]}
                userName={comment["user"]["name"]}
                userAlias={comment["user"]["username"]}
                content={comment["content"]}
                replies={comment["replies"]}
              />
            ))}
        </div>
      </div>
      <AddComment />
    </React.Fragment>
  );
};

export default CommentsSection;
