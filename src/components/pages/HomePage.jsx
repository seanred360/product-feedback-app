import React, { useContext } from "react";
import _ from "lodash";
import ProductRequestEmpty from "../ProductRequestEmpty";
import ProductRequest from "../ProductRequest";
import { DataContext } from "../../custom-hooks/Contexts";
import Menu from "../Menu";

const HomePage = () => {
  const { filteredProducts } = useContext(DataContext);

  if (!filteredProducts || _.isEmpty(filteredProducts)) {
    return <ProductRequestEmpty />;
  }
  return (
    <>
      <Menu />
      <div className="home-page">
        {filteredProducts.map((product) => (
          <ProductRequest
            product={product}
            key={product["_id"]}
            title={product["title"]}
            description={product["description"]}
            category={product["category"]}
            upvotes={product["upvotes"]}
            commentsCount={_.size(product["comments"])}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;
