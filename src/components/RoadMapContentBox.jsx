import CategoryButton from "./common/CategoryButton";
import UpVote from "./common/UpVote";
import CommentsCounter from "./common/CommentsCounter";
import { useHistory } from "react-router";

const RoadMapContentBox = ({ feedback }) => {
  const history = useHistory();

  return (
    <div
      className="__roadmap-feedback-box"
      onClick={() => history.push(`/${feedback.slug}`)}
    >
      <li className="__feedback-status">
        {feedback.status.replace(/(^\w|\s\w|-\w)/g, (m) => m.toUpperCase())}
      </li>

      <span className="__feedback-name">{feedback.title}</span>
      <p className="__feedback-description">{feedback.description}</p>
      <CategoryButton itemName={"Feature"} />
      <div className="__bottom">
        <UpVote feedback={feedback} />
        <CommentsCounter commentsCount={feedback.comments.length} />
      </div>
    </div>
  );
};

export default RoadMapContentBox;
