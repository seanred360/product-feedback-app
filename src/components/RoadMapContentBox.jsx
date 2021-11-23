import React from "react";
import CategoryButton from "./common/CategoryButton";
import UpVote from "./common/UpVote";
import CommentsCounter from "./common/CommentsCounter";

const RoadMapContentBox = () => {
  return (
    <div className="__roadmap-content-box">
      <li className="__content-category">In Progress</li>

      <span className="__content-name">One-click portfolio generation</span>
      <p className="__content-description">
        Add ability to create professional looking portfolio from profile.
      </p>
      <CategoryButton itemName={"Feature"} />
      <div className="__bottom">
        <UpVote upvotes={62} />
        <CommentsCounter commentsCount={1} />
      </div>
    </div>
  );
};

export default RoadMapContentBox;
