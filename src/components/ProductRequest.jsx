import React, { useContext } from "react";
import CategoryButton from "./common/CategoryButton";
import UpVote from "./common/UpVote";
import CommentsCounter from "./common/CommentsCounter";
import { useHistory } from "react-router";
import { DataContext } from "../custom-hooks/Contexts";

const ProductRequest = ({
  product,
  title,
  description,
  category,
  upvotes,
  commentsCount,
}) => {
  const history = useHistory();
  const { setSelectedProduct } = useContext(DataContext);

  const handleClick = () => {
    setSelectedProduct(product);
    history.push("/feedback-detail");
  };

  return (
    <div className="product-request" onClick={handleClick}>
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
