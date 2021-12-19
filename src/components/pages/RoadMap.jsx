import React, { useState, useContext } from "react";
import Backbutton from "../common/BackButton";
import AddFeedbackButton from "../AddFeedbackButton";
import RoadMapContentBox from "../RoadMapContentBox";
import { DataContext } from "../../custom-hooks/Contexts";
import _ from "lodash";

const RoadMap = () => {
  const data = useContext(DataContext);
  const productRequests = data["productRequests"];

  const productsPlanned = _.filter(
    productRequests,
    (product) => product.status === "planned"
  );
  const productsInProgress = _.filter(
    productRequests,
    (product) => product.status === "in-progress"
  );
  const productsLive = _.filter(
    productRequests,
    (product) => product.status === "live"
  );

  const [activeStatus, setActiveStatus] = useState("in-progress");
  const [activeStatusArray, setActiveStatusArray] =
    useState(productsInProgress);

  const onClick = (activeStatus, activeStatusArray) => {
    setActiveStatus(activeStatus);
    setActiveStatusArray(activeStatusArray);
  };

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
          className={activeStatus === "planned" ? "--active" : ""}
          onClick={() => onClick("planned", productsPlanned)}
        >
          Planned ({productsPlanned.length})
        </button>
        <button
          className={activeStatus === "in-progress" ? "--active" : ""}
          onClick={() => onClick("in-progress", productsInProgress)}
        >
          In-Progress ({productsInProgress.length})
        </button>
        <button
          className={activeStatus === "live" ? "--active" : ""}
          onClick={() => onClick("live", productsLive)}
        >
          Live ({productsLive.length})
        </button>
      </div>

      <div className="__container">
        <div className="__header">
          <h2 className="__header-name">
            {activeStatus} ({activeStatusArray.length})
          </h2>
          <span className="__header-description">
            Features currently being developed
          </span>
        </div>
        {activeStatusArray.map((product) => (
          <RoadMapContentBox key={product["title"]} content={product} />
        ))}
      </div>
    </div>
  );
};

export default RoadMap;
