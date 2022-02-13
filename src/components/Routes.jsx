import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ViewFeedbackPage from "./pages/ViewFeedbackPage";
import PostFeedbackPage from "./pages/PostFeedbackPage";
import RoadMapPage from "./pages/RoadMapPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./common/PrivateRoute";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import EditFeedbackPage from "./pages/EditFeedbackPage";
import AccountPage from "./pages/AccountPage";

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={HomePage} />
      <Route path="/road-map" component={RoadMapPage} />
      <PrivateRoute path="/account" component={AccountPage} />
      <PrivateRoute path="/update-profile" component={UpdateProfilePage} />
      <PrivateRoute path="/new" component={PostFeedbackPage} />
      <PrivateRoute path="/edit/:slug" component={EditFeedbackPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/sign-up" component={SignupPage} />
      <Route path="/log-in" component={LoginPage} />
      <Route path="/not-found" component={NotFoundPage} />
      <Route
        path="/:slug"
        render={(props) => <ViewFeedbackPage {...props} />}
      />
    </Switch>
  );
};

export default Routes;
