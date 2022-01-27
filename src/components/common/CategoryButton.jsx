import _ from "lodash";

const CategoryButton = ({ itemName, dataToSort, setData }) => {
  const handleClick = (filterCategory) => {
    if (filterCategory === "all") setData(dataToSort);
    else {
      setData(_.filter(dataToSort, (data) => data.category === filterCategory));
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
