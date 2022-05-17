import TextInput from "../common/TextInput";
import { useAuth } from "../../custom-hooks/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import BackButton from "../common/BackButton";
import Spinner from "../common/Spinner";
import { MdMarkEmailRead } from "react-icons/md";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const { resetPassword } = useAuth();
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const isReauthenticate = history.location.reauthenticate;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (input) => {
    let data = { ...formData };
    data[input.name] = input.value;
    setFormData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await toast.promise(resetPassword(formData.email), {
        pending: "Sending password reset email",
        success: `Check your email for further instructions`,
        error: "Failed to reset your password",
      });
      setMessage("Check your email for further instructions");
      setHasSubmitted(true);
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        setError("This email is not valid");
      }
      if (err.code === "auth/user-not-found") {
        setError("There are no users with this email");
      } else {
        console.log(err);
        setError("Something went wrong");
      }
    }
    setLoading(false);
  };

  if (!hasSubmitted)
    return (
      <div className="edit-account-page">
        {isReauthenticate ? (
          <div className="__top-group flex flex-ai-c flex-jc-sb">
            <BackButton />
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <h1>Reset Password</h1>
              <TextInput
                name={"email"}
                label={"Email"}
                type={"email"}
                placeholder="&#xf0e0;"
                instructions={"Please enter your email to reset your password"}
                required={true}
                autoFocus={true}
                onChange={(e) => handleChange(e.target)}
                message={message}
                error={error}
              />
              <div className="__buttons">
                <button className="all-buttons --purple-button" type="submit">
                  Save Changes
                </button>
                <button
                  className="all-buttons --blue-grey2-button"
                  type="button"
                  onClick={() => history.goBack()}
                >
                  Cancel
                </button>
              </div>{" "}
            </>
          )}
          <span className="--loading-message">
            {loading ? "Resetting your password" : null}
          </span>
          {isReauthenticate || loading ? null : (
            <>
              <div className="__login-link">
                <Link to="/log-in">Login</Link>
              </div>
              <div className="__sign-up">
                Need an account? <Link to="/sign-up">Sign Up</Link>
              </div>
            </>
          )}
        </form>
      </div>
    );
  else {
    return (
      <div className="password-page">
        <div className="submit-success">
          <MdMarkEmailRead />
          <h1>Success!</h1>
          <p>Check your email for further instructions</p>
          <div>
            <button
              className="all-buttons --gradiant-button"
              onClick={() => history.push("/log-in")}
            >
              Log In
            </button>
          </div>
          <div className="__sign-up">
            Need an account? <Link to="/sign-up">Sign Up</Link>
          </div>
        </div>
      </div>
    );
  }
};

export default ResetPasswordPage;
