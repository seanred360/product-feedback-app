import React from "react";

const CategoryButton = ({ itemName }) => {
  return (
    <div className="--button-category">
      <span className="__item-name">{itemName}</span>
    </div>
  );
};

export default CategoryButton;
