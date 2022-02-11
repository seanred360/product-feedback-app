import React, { useState, useEffect } from "react";
import Backbutton from "../common/BackButton";
import PostFeedbackButton from "../PostFeedbackButton";
import RoadMapContentBox from "../RoadMapContentBox";
import Spinner from "../common/Spinner";
import _ from "lodash";
import useAxios from "../../custom-hooks/useAxios";

const RoadMapPage = () => {
  const [feedback, setFeedback] = useState();
  const [activeStatus, setActiveStatus] = useState("in-progress");
  const [activeStatusArray, setActiveStatusArray] = useState();

  const { response, loading, error } = useAxios({
    method: "get",
    url: process.env.REACT_APP_MONGO_URL,
  });

  useEffect(() => {
    if (response !== null) {
      setFeedback(response);
      setActiveStatusArray(_.filter(response, (res) => res.status === "in-progress"));
    }
  }, [response]);

  const getFeedbackPlanned = () => {
    return _.filter(feedback, (feedback) => feedback.status === "planned");
  };
  const getFeedbackInProgress = () => {
    return _.filter(feedback, (feedback) => feedback.status === "in-progress");
  };
  const getFeedbackLive = () => {
    return _.filter(feedback, (feedback) => feedback.status === "live");
  };

  const handleClick = (activeStatus, activeStatusArray) => {
    setActiveStatus(activeStatus);
    setActiveStatusArray(activeStatusArray);
  };

  if (loading) return <Spinner />;
  if (error) return <h1>null data</h1>;
  return (
    <div className="road-map-page">
      <div className="__nav-top">
        <div className="__left">
          <Backbutton />
          <h1>Roadmap</h1>
        </div>
        <div className="__right">
          <PostFeedbackButton />
        </div>
      </div>
      <div className="__nav-bottom">
        <button
          className={activeStatus === "planned" ? "--active" : ""}
          onClick={() => handleClick("planned", getFeedbackPlanned())}
        >
          Planned ({getFeedbackPlanned().length})
        </button>
        <button
          className={activeStatus === "in-progress" ? "--active" : ""}
          onClick={() => handleClick("in-progress", getFeedbackInProgress())}
        >
          In-Progress ({getFeedbackInProgress().length})
        </button>
        <button
          className={activeStatus === "live" ? "--active" : ""}
          onClick={() => handleClick("live", getFeedbackLive())}
        >
          Live ({getFeedbackLive().length})
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
        {activeStatusArray.map((feedback) => (
          <RoadMapContentBox key={feedback._id} feedback={feedback} />
        ))}
      </div>
    </div>
  );
};

export default RoadMapPage;
