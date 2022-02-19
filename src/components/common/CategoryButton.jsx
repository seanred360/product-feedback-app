import _ from "lodash";

const CategoryButton = ({
  setIsOpen = null,
  itemCategory,
  dataToSort,
  setData,
  disabled = false,
  currentCategory = null,
  setCurrentCategory = null,
}) => {
  const handleClick = (filterCategory) => {
    if (filterCategory === "All") setData(dataToSort);
    else {
      setData(_.filter(dataToSort, (data) => data.category === filterCategory));
    }
    setIsOpen && setIsOpen(false);
    setCurrentCategory && setCurrentCategory(itemCategory);
  };

  return (
    <button
      className={
        currentCategory === itemCategory
          ? `category-button selected ${disabled && "disabled"}`
          : `category-button ${disabled && "disabled"}`
      }
      onClick={() => handleClick(itemCategory)}
      disabled={disabled}
    >
      <span className="__item-name">{itemCategory}</span>
    </button>
  );
};

export default CategoryButton;
