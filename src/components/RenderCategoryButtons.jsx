import CategoryButton from "./common/CategoryButton";

const RenderCategoryButtons = ({ setIsOpen, dataToSort, setData }) => {
  const items = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

  return (
    <div className="--menu-top">
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
