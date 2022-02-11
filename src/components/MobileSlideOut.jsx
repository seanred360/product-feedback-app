import React from "react";
import CategorySelectButtons from "./RenderCategoryButtons";
import RoadMapOverview from "./RoadMapOverview";

const MobileSlideOut = ({ setIsOpen, isOpen, dataToSort, setData }) => {
  return (
    <>
      <div className={`fade-overlay ${isOpen ? `--open` : ``}`} />
      <div className={`mobile-menu-container ${isOpen ? `--open` : ``}`}>
        <div className="__mobile-menu">
          <CategorySelectButtons
            dataToSort={dataToSort}
            setData={setData}
            setIsOpen={setIsOpen}
          />
          <RoadMapOverview feedback={dataToSort}/>
        </div>
      </div>
    </>
  );
};

export default MobileSlideOut;
