import PostComment from "./PostComment";
import RenderComment from "./RenderComment";

const RenderCommentsSection = ({ commentsCount, targetFeedback }) => {
  const comments = targetFeedback.comments;

  return (
    <>
      <div className="comments-section">
        <div className="comments">
          <h1 className="comments-count">{commentsCount} Comments</h1>
          {comments &&
            comments.map((comment) => (
              <RenderComment
                key={comment._id}
                id={comment._id}
                userImage={comment.user.image}
                userName={comment.user.name}
                content={comment.content}
                replies={comment.replies}
              />
            ))}
        </div>
      </div>
      <PostComment targetFeedback={targetFeedback} placeholder="Type your comment here"/>
    </>
  );
};

export default RenderCommentsSection;
