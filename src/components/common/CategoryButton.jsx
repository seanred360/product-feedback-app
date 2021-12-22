import React, { useContext } from "react";
import { DataContext } from "../../custom-hooks/Contexts";
import _ from "lodash";

const CategoryButton = ({ itemName }) => {
  const { data, setFilteredProducts } = useContext(DataContext);
  const handleClick = (filterCategory) => {
    if (filterCategory === "all") setFilteredProducts(data["productRequests"]);
    else {
      setFilteredProducts(
        _.filter(
          data["productRequests"],
          (product) => product.category === filterCategory
        )
      );
    }
  };

  return (
    <div
      className="--button-category"
      onClick={() => handleClick(itemName.toLowerCase())}
    >
      <span className="__item-name">{itemName}</span>
    </div>
  );
};

export default CategoryButton;
