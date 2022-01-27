import _ from "lodash";
import ProductRequest from "./ProductRequest";
import ProductRequestEmpty from "./ProductRequestEmpty";

const Feed = ({ productRequests }) => {
  return (
    <>
      {productRequests && !_.isEmpty(productRequests) ? (
        productRequests
          .slice(0)
          .reverse()
          .map((product) => (
            <ProductRequest
              product={product}
              key={product["_id"]}
              title={product["title"]}
              description={product["description"]}
              category={product["category"]}
              upvotes={product["upvotes"]}
              commentsCount={_.size(product["comments"])}
            />
          ))
      ) : (
        <ProductRequestEmpty />
      )}
    </>
  );
};

export default Feed;
