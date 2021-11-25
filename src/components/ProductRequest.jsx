import React from "react";
import CategoryButton from "./common/CategoryButton";
import UpVote from "./common/UpVote";
import CommentsCounter from "./common/CommentsCounter";

const ProductRequest = ({
  title,
  description,
  category,
  upvotes,
  commentsCount,
  onClickEvent,
}) => {
  return (
    <div className="product-request" onClick={onClickEvent}>
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

export default ProductRequest;
