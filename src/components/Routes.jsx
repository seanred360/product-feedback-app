import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import FeedbackDetail from "./pages/FeedbackDetail";
import NewFeedback from "./pages/NewFeedback";
import RoadMap from "./pages/RoadMap";
import Menu from "./Menu";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/not-found" component={NotFound}></Route>
      <Route exact path="/new-feedback" component={NewFeedback}></Route>
      <Route exact path="/edit-feedback" component={NewFeedback}></Route>
      <Route exact path="/road-map" component={RoadMap}></Route>
      <Route
        exact
        path="/feedback-detail"
        render={(props) => <FeedbackDetail {...props} />}
      ></Route>
      <Route
        exact
        path="/"
        render={(props) => (
          <>
            <Menu />
            <HomePage {...props} />
          </>
        )}
      ></Route>
    </Switch>
  );
};

export default Routes;
