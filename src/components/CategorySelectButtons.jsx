import CategoryButton from "./common/CategoryButton";

const CategorySelectButtons = ({ dataToSort, setData }) => {
  const items = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

  return (
    <div className="--menu-top">
      {items.map((item) => (
        <CategoryButton
          key={item}
          itemName={item}
          dataToSort={dataToSort}
          setData={setData}
        />
      ))}
    </div>
  );
};

export default CategorySelectButtons;
