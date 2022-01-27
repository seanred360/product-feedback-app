import { Link } from "react-router-dom";

const RoadMapOverview = () => {
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
          <span className="--number">2</span>
        </li>
        <li>
          <span className="--dot -purple"></span>
          In-Progress <span className="--number">3</span>
        </li>
        <li>
          <span className="--dot -light-blue"></span>
          Live <span className="--number">1</span>
        </li>
      </ul>
    </div>
  );
};

export default RoadMapOverview;
