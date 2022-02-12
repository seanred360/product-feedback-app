import CategoryButton from "./common/CategoryButton";

const RenderCategoryButtons = ({ setIsOpen, dataToSort, setData }) => {
  const items = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

  return (
    <div className="category-buttons">
      {items.map((item) => (
        <CategoryButton
          key={item}
          setIsOpen={setIsOpen}
          itemName={item}
          dataToSort={dataToSort}
          setData={setData}
        />
      ))}
    </div>
  );
};

export default RenderCategoryButtons;
