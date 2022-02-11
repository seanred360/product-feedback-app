import _ from "lodash";

const CategoryButton = ({ setIsOpen, itemName, dataToSort, setData }) => {
  const handleClick = (filterCategory) => {
    if (filterCategory === "All") setData(dataToSort);
    else {
      setData(_.filter(dataToSort, (data) => data.category === filterCategory));
    }
    setIsOpen(false);
  };

  return (
    <div className="--button-category" onClick={() => handleClick(itemName)}>
      <span className="__item-name">{itemName}</span>
    </div>
  );
};

export default CategoryButton;
