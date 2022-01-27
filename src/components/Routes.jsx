import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ViewFeedbackPage from "./pages/ViewFeedbackPage";
import NewFeedbackPage from "./pages/NewFeedbackPage";
import RoadMapPage from "./pages/RoadMapPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./common/PrivateRoute";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import EditFeedbackPage from "./pages/EditFeedbackPage";

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={HomePage} />
      <PrivateRoute path="/update-profile" component={UpdateProfilePage} />
      <PrivateRoute path="/new" component={NewFeedbackPage} />
      <PrivateRoute path="/:id/edit" component={EditFeedbackPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/sign-up" component={SignupPage} />
      <Route path="/log-in" component={LoginPage} />
      <Route path="/not-found" component={NotFoundPage} />
      <Route path="/:id" render={(props) => <ViewFeedbackPage {...props} />} />
      <Route exact path="/road-map" component={RoadMapPage} />
    </Switch>
  );
};

export default Routes;
