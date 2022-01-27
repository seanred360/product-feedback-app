import React from "react";
import CategorySelectButtons from "./CategorySelectButtons";
import RoadMapOverview from "./RoadMapOverview";

const MobileSlideOut = ({ isOpen, dataToSort, setData }) => {
  return (
    <>
      <div className={`fade-overlay ${isOpen ? `--open` : ``}`}></div>
      <div className={`mobile-menu-container ${isOpen ? `--open` : ``}`}>
        <div className="__mobile-menu">
          <CategorySelectButtons dataToSort={dataToSort} setData={setData} />
          <RoadMapOverview />
        </div>
      </div>
    </>
  );
};

export default MobileSlideOut;
