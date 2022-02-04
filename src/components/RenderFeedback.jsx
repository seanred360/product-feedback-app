import CategoryButton from "./common/CategoryButton";
import UpVote from "./common/UpVote";
import CommentsCounter from "./common/CommentsCounter";
import { useHistory } from "react-router";

const RenderFeedback = ({
  feedback,
  title,
  description,
  category,
  upvotes,
  commentsCount,
}) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/${feedback.slug}`);
  };

  return (
    <div className="feedback" onClick={handleClick}>
      <h1 className="__title">{title}</h1>
      <p className="__description">{description}</p>
      <CategoryButton itemName={category} />
      <div className="__bottom">
        <UpVote upvotesCount={upvotes.length} feedback={feedback} />
        <CommentsCounter commentsCount={commentsCount} />
      </div>
    </div>
  );
};

export default RenderFeedback;
