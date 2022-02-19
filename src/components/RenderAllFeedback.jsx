import _ from "lodash";
import RenderFeedback from "./RenderFeedback";
import RenderFeedbackEmpty from "./RenderFeedbackEmpty";

const RenderAllFeedback = ({ feedbackPosts }) => {
  return (
    <div className="all-feedback">
      {feedbackPosts && !_.isEmpty(feedbackPosts) ? (
        feedbackPosts.map((feedback) => (
          <RenderFeedback
            feedback={feedback}
            key={feedback._id}
            title={feedback.title}
            description={feedback.description}
            category={feedback.category}
            upvotes={feedback.upvotes}
            commentsCount={_.size(feedback.comments)}
            clickable={true}
          />
        ))
      ) : (
        <RenderFeedbackEmpty />
      )}
    </div>
  );
};

export default RenderAllFeedback;
