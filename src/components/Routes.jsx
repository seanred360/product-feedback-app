import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ViewFeedbackPage from "./pages/ViewFeedbackPage";
import PostFeedbackPage from "./pages/PostFeedbackPage";
import RoadMapPage from "./pages/RoadMapPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./common/PrivateRoute";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import EditFeedbackPage from "./pages/EditFeedbackPage";
import AccountPage from "./pages/AccountPage";
import EditAccountNamePage from "./pages/EditAccountNamePage";
import EditAccountEmailPage from "./pages/EditAccountEmailPage";

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={HomePage} />
      <PrivateRoute path="/road-map" component={RoadMapPage} />
      <PrivateRoute path="/account" component={AccountPage} />
      <PrivateRoute
        path="/edit-account-email"
        component={EditAccountEmailPage}
      />
      <PrivateRoute path="/edit-account" component={EditAccountNamePage} />
      <PrivateRoute path="/update-profile" component={UpdateProfilePage} />
      <PrivateRoute path="/new" component={PostFeedbackPage} />
      <PrivateRoute path="/edit/:slug" component={EditFeedbackPage} />
      <PrivateRoute path="/reset-password" component={ResetPasswordPage} />
      <PrivateRoute path="/sign-up" isPublic={true} component={SignupPage} />
      <Route path="/log-in" component={LoginPage} />
      <Route path="/not-found" component={NotFoundPage} />
      <PrivateRoute path="/:slug" component={ViewFeedbackPage} />
    </Switch>
  );
};

export default Routes;
