import CategoryButton from "./common/CategoryButton";
import UpVote from "./common/UpVote";
import CommentsCounter from "./common/CommentsCounter";
import { useHistory } from "react-router";

const RenderFeedback = ({
  feedback,
  title,
  description,
  category,
  commentsCount,
  clickable = false,
}) => {
  const history = useHistory();
  const handleClick = () => {
    clickable && history.push(`/${feedback.slug}`);
  };

  return (
    <div className="feedback" onClick={handleClick}>
      <h1 className="__title">{title}</h1>
      <p className="__description">{description}</p>
      <CategoryButton itemName={category} disabled={true} />
      <div className="__bottom">
        <UpVote feedback={feedback} />
        <CommentsCounter commentsCount={commentsCount} />
      </div>
    </div>
  );
};

export default RenderFeedback;
