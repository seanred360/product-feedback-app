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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 576);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => {
      window.removeEventListener("resize", updateMedia);
    };
  });

  const { response, loading, error } = useAxios({
    method: "get",
    url: process.env.REACT_APP_MONGO_URL,
  });

  useEffect(() => {
    if (response !== null) {
      setFeedback(response);
      setActiveStatusArray(
        _.filter(response, (res) => res.status === "in-progress")
      );
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

  if (loading)
    return (
      <div
        style={{ height: "100vh", display: "flex", justifyContent: "center" }}
      >
        <Spinner />
      </div>
    );
  if (error) return <strong>No Data Found</strong>;
  return (
    <div className="road-map-page">
      {isMobile ? (
        <>
          <div className="__nav-top">
            <div className="__left">
              <Backbutton />
              <h1>Roadmap</h1>
            </div>
            <div className="__right">
              <PostFeedbackButton />
            </div>
          </div>
          <div className="__nav-mobile">
            <button
              className={activeStatus === "planned" ? "--active --orange" : ""}
              onClick={() => handleClick("planned", getFeedbackPlanned())}
            >
              Planned ({getFeedbackPlanned().length})
            </button>
            <button
              className={
                activeStatus === "in-progress" ? "--active --purple" : ""
              }
              onClick={() =>
                handleClick("in-progress", getFeedbackInProgress())
              }
            >
              In-Progress ({getFeedbackInProgress().length})
            </button>
            <button
              className={activeStatus === "live" ? "--active --blue" : ""}
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
              <RoadMapContentBox
                key={feedback._id}
                feedback={feedback}
                color={
                  (activeStatus === "planned" && "--orange") ||
                  (activeStatus === "in-progress" && "--purple") ||
                  (activeStatus === "live" && "--blue")
                }
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="__nav-top">
            <div className="__left">
              <Backbutton />
              <h1>Roadmap</h1>
            </div>
            <div className="__right">
              <PostFeedbackButton />
            </div>
          </div>
          <div className="__roadmap-columns ">
            <div className="__left">
              <div className="__container">
                <div className="__header">
                  <h2 className="__header-name">
                    Planned ({getFeedbackPlanned().length})
                  </h2>
                  <span className="__header-description">
                    Ideas prioritized for research
                  </span>
                </div>
                {getFeedbackPlanned().map((feedback) => (
                  <RoadMapContentBox
                    key={feedback._id}
                    feedback={feedback}
                    color="--orange"
                  />
                ))}
              </div>
            </div>
            <div className="__middle">
              <div className="__container">
                <div className="__header">
                  <h2 className="__header-name">
                    In-Progress ({getFeedbackInProgress().length})
                  </h2>
                  <span className="__header-description">
                    Features currently being developed
                  </span>
                </div>
                {getFeedbackInProgress().map((feedback) => (
                  <RoadMapContentBox
                    key={feedback._id}
                    feedback={feedback}
                    color="--purple"
                  />
                ))}
              </div>
            </div>
            <div className="__right">
              <div className="__container">
                <div className="__header">
                  <h2 className="__header-name">
                    Live ({getFeedbackLive().length})
                  </h2>
                  <span className="__header-description">
                    Released features
                  </span>
                </div>
                {getFeedbackLive().map((feedback) => (
                  <RoadMapContentBox
                    key={feedback._id}
                    feedback={feedback}
                    color="--blue"
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RoadMapPage;
