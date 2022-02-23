import CategoryButton from "./common/CategoryButton";
import UpVote from "./common/UpVote";
import CommentsCounter from "./common/CommentsCounter";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";

const RenderFeedback = ({
  feedback,
  title,
  description,
  category,
  commentsCount,
  clickable = false,
  isBlank = false,
}) => {
  const history = useHistory();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);
  const handleClick = () => {
    clickable && history.push(`/${feedback.slug}`);
  };

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 576);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => {
      window.removeEventListener("resize", updateMedia);
    };
  });

  return (
    <>
      {isMobile ? (
        <div
          className={`feedback ${clickable && "--clickable"} fade-up`}
          onClick={handleClick}
        >
          <h1 className="__title">{title}</h1>
          <p className="__description">{description}</p>
          <CategoryButton itemCategory={category} disabled={true} />
          <div className="__bottom">
            <UpVote feedback={feedback} />
            <CommentsCounter commentsCount={commentsCount} />
          </div>
        </div>
      ) : (
        <div
          className={`feedback ${clickable && "--clickable"} ${
            isBlank && "--blank"
          }`}
          onClick={handleClick}
        >
          <UpVote feedback={feedback} />
          <div className="__middle">
            <h1 className="__title">{title}</h1>
            <p className="__description">{description}</p>
            <CategoryButton itemCategory={category} disabled={true} />
          </div>
          <div className="__right">
            <CommentsCounter commentsCount={commentsCount} />
          </div>
        </div>
      )}
    </>
  );
};

export default RenderFeedback;
