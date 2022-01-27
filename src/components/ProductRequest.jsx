import CategoryButton from "./common/CategoryButton";
import UpVote from "./common/UpVote";
import CommentsCounter from "./common/CommentsCounter";
import { useHistory } from "react-router";

const ProductRequest = ({
  product,
  title,
  description,
  category,
  upvotes,
  commentsCount,
}) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/${product._id}`);
  };

  return (
    <div className="product-request" onClick={handleClick}>
      <h1 className="__title">{title}</h1>
      <p className="__description">{description}</p>
      <CategoryButton itemName={category} />
      <div className="__bottom">
        <UpVote upvotes={upvotes.length} product={product} />
        <CommentsCounter commentsCount={commentsCount} />
      </div>
    </div>
  );
};

export default ProductRequest;
