import React from "react";

const CategoryButton = ({item}) => {
  return (
    <div className="category-button">
      <span className="__item-name">{item}</span>
    </div>
  );
};

export default CategoryButton;
