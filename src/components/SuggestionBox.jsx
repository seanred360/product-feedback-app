import React from "react";
import CategoryButton from "../components/common/CategoryButton";
import UpVote from "../components/common/UpVote";
import CommentsCounter from "./common/CommentsCounter";

const SuggestionBox = ({
  title,
  description,
  category,
  upvotes,
  commentsCount,
  onClickEvent,
}) => {
  return (
    <div className="suggestion-box" onClick={onClickEvent}>
      <h1 className="__title">{title}</h1>
      <p className="__description">{description}</p>
      <CategoryButton itemName={category} />
      <div className="__bottom">
        <UpVote upvotes={upvotes} />
        <CommentsCounter commentsCount={commentsCount} />
      </div>
    </div>
  );
};

export default SuggestionBox;
