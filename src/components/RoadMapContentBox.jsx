import React from "react";
import CategoryButton from "./common/CategoryButton";
import UpVote from "./common/UpVote";
import CommentsCounter from "./common/CommentsCounter";
import _ from 'lodash';

const RoadMapContentBox = ({content}) => {
  return (
    <div className="__roadmap-content-box">
      <li className="__content-status">{content["status"]}</li>

      <span className="__content-name">{content["title"]}</span>
      <p className="__content-description">
        {content["description"]}
      </p>
      <CategoryButton itemName={"Feature"} />
      <div className="__bottom">
        <UpVote upvotes={content["upvotes"]} />
        <CommentsCounter commentsCount={_.size(content["comments"])} />
      </div>
    </div>
  );
};

export default RoadMapContentBox;
