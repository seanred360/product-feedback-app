import { useState } from "react";
import CategoryButton from "../common/CategoryButton";

const WidgetSelectCategory = ({ setIsOpen, dataToSort, setData }) => {
  const [currentCategory, setCurrentCategory] = useState("All");
  const filterCategories = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

  return (
    <div className="widget-select-category">
      {filterCategories.map((category) => (
        <CategoryButton
          key={category}
          setIsOpen={setIsOpen}
          itemCategory={category}
          dataToSort={dataToSort}
          setData={setData}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
      ))}
    </div>
  );
};

export default WidgetSelectCategory;
