import { Link } from "react-router-dom";
import _ from "lodash";

const RoadMapOverview = ({ feedback }) => {
  const getFeedbackPlanned = () => {
    return _.filter(feedback, (feedback) => feedback.status === "planned");
  };
  const getFeedbackInProgress = () => {
    return _.filter(feedback, (feedback) => feedback.status === "in-progress");
  };
  const getFeedbackLive = () => {
    return _.filter(feedback, (feedback) => feedback.status === "live");
  };

  return (
    <div className="--menu-bottom">
      <span className="--menu-bottom-title">Roadmap</span>
      <Link to="/road-map" className="--menu-bottom-view">
        View
      </Link>
      <ul>
        <li>
          <span className="--dot -peach"></span>
          Planned
          <span className="--number">{getFeedbackPlanned().length}</span>
        </li>
        <li>
          <span className="--dot -purple"></span>
          In-Progress{" "}
          <span className="--number">{getFeedbackInProgress().length}</span>
        </li>
        <li>
          <span className="--dot -light-blue"></span>
          Live <span className="--number">{getFeedbackLive().length}</span>
        </li>
      </ul>
    </div>
  );
};

export default RoadMapOverview;
