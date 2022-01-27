import { useState } from "react/";
import AddComment from "./AddComment";
import Comment from "./Comment";

const CommentsSection = ({ commentsCount, targetFeedback }) => {
  const comments = targetFeedback.comments;

  return (
    <>
      <div className="comments-section">
        <div className="comments">
          <h1 className="comments-count">{commentsCount} Comments</h1>
          {comments &&
            comments.map((comment) => (
              <Comment
                key={comment["id"]}
                userImage={comment["user"]["image"]}
                userName={comment["user"]["name"]}
                userAlias={comment["user"]["username"]}
                content={comment["content"]}
                replies={comment["replies"]}
              />
            ))}
        </div>
      </div>
      <AddComment targetFeedback={targetFeedback} />
    </>
  );
};

export default CommentsSection;
