import WidgetSelectCategory from "./widgets/WidgetSelectCategory";
import WidgetRoadMap from "./widgets/WidgetRoadMap";
import WidgetUser from "./widgets/WidgetUser";

const MobileSlideOut = ({ setIsOpen, isOpen, dataToSort, setData }) => {
  return (
    <>
      <div className={`fade-overlay ${isOpen ? `--open` : ``}`} />
      <div className={`slide-out-container ${isOpen ? `--open` : ``}`}>
        <div className="mobile-slide-out">
          <WidgetUser />
          <WidgetSelectCategory
            dataToSort={dataToSort}
            setData={setData}
            setIsOpen={setIsOpen}
          />
          <WidgetRoadMap feedback={dataToSort} />
        </div>
      </div>
    </>
  );
};

export default MobileSlideOut;
