import { Link } from "react-router-dom";
import _ from "lodash";

const WidgetRoadMap = ({ feedback }) => {
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
    <div className="widget-road-map">
      <span className="__title">Roadmap</span>
      <Link to="/road-map">View</Link>
      <ul>
        <li>
          <span className="--dot --peach"></span>
          Planned
          <span className="--count">{getFeedbackPlanned().length}</span>
        </li>
        <li>
          <span className="--dot --purple"></span>
          In-Progress{" "}
          <span className="--count">{getFeedbackInProgress().length}</span>
        </li>
        <li>
          <span className="--dot --light-blue"></span>
          Live <span className="--count">{getFeedbackLive().length}</span>
        </li>
      </ul>
    </div>
  );
};

export default WidgetRoadMap;
