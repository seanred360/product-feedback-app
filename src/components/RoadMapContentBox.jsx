import React, { useContext } from "react";
import CategoryButton from "./common/CategoryButton";
import UpVote from "./common/UpVote";
import CommentsCounter from "./common/CommentsCounter";
import _ from "lodash";
import { DataContext } from "../custom-hooks/Contexts";
import { useHistory } from "react-router";

const RoadMapContentBox = ({ content }) => {
  const { setSelectedProduct } = useContext(DataContext);
  const history = useHistory();

  const handleClick = (content) => {
    setSelectedProduct(content);
    history.push("/feedback-detail");
  };

  return (
    <div className="__roadmap-content-box" onClick={() => handleClick(content)}>
      <li className="__content-status">{content["status"]}</li>

      <span className="__content-name">{content["title"]}</span>
      <p className="__content-description">{content["description"]}</p>
      <CategoryButton itemName={"Feature"} />
      <div className="__bottom">
        <UpVote upvotes={content["upvotes"]} />
        <CommentsCounter commentsCount={_.size(content["comments"])} />
      </div>
    </div>
  );
};

export default RoadMapContentBox;
