import _ from "lodash";

const CategoryButton = ({
  setIsOpen,
  itemName,
  dataToSort,
  setData,
  disabled = false,
}) => {
  const handleClick = (filterCategory) => {
    if (filterCategory === "All") setData(dataToSort);
    else {
      setData(_.filter(dataToSort, (data) => data.category === filterCategory));
    }
    setIsOpen(false);
  };

  return (
    <button
      className="category-button"
      onClick={() => handleClick(itemName)}
      disabled={disabled}
    >
      <span className="__item-name">{itemName}</span>
    </button>
  );
};

export default CategoryButton;
