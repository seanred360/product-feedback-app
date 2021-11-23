import React, { useState } from "react";
import Backbutton from "../common/BackButton";
import AddFeedbackButton from "../AddFeedbackButton";
import RoadMapContentBox from "../RoadMapContentBox";

const RoadMap = () => {
  const [activeButton, setActiveButton] = useState(1);

  return (
    <div className="roadmap">
      <div className="__nav-top">
        <div className="__left">
          <Backbutton />
          <h1>Roadmap</h1>
        </div>
        <div className="__right">
          <AddFeedbackButton />
        </div>
      </div>
      <div className="__nav-bottom">
        <button
          className={activeButton === 0 ? "--active" : ""}
          onClick={() => setActiveButton(0)}
        >
          Planned ({2})
        </button>
        <button
          className={activeButton === 1 ? "--active" : ""}
          onClick={() => setActiveButton(1)}
        >
          In-Progress ({3})
        </button>
        <button
          className={activeButton === 2 ? "--active" : ""}
          onClick={() => setActiveButton(2)}
        >
          Live ({1})
        </button>
      </div>

      <div className="__container">
        <div className="__header">
          <h2 className="__header-name">In-Progress ({3})</h2>
          <span className="__header-description">
            Features currently being developed
          </span>
        </div>
        <RoadMapContentBox />
        <RoadMapContentBox />
        <RoadMapContentBox />
      </div>
    </div>
  );
};

export default RoadMap;
