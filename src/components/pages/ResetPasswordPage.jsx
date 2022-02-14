import TextInput from "../common/TextInput";
import { useAuth } from "../../custom-hooks/AuthContext";
import { useState } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import BackButton from "../common/BackButton";
import Spinner from "../common/Spinner";
import { MdMarkEmailRead } from "react-icons/md";

const ResetPasswordPage = () => {
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const history = useHistory();
  const isReauthenticate = history.location.reauthenticate;

  const handleChange = (input) => {
    let data = { ...formData };
    data[input.name] = input.value;
    setFormData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(formData.email);
      setMessage("Check your email for further instructions");
      setHasSubmitted(true);
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  };

  if (!hasSubmitted)
    return (
      <div className="password-page">
        {isReauthenticate ? (
          <div className="__top-group flex flex-ai-c flex-jc-sb">
            <BackButton />
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <TextInput
            name={"email"}
            label={"Reset Password"}
            type={"email"}
            placeholder="&#xf0e0;"
            instructions={"Please enter your email to reset your password"}
            required={true}
            autoFocus={true}
            onChange={(e) => handleChange(e.target)}
            message={message}
            error={error}
          />
          {loading ? (
            <Spinner />
          ) : (
            <button
              className="all-buttons --gradiant-button"
              type="submit"
              disabled={loading}
            >
              Reset Password
            </button>
          )}

          {isReauthenticate || loading ? null : (
            <>
              <div>
                <Link to="/log-in">Login</Link>
              </div>
              <div>
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
            <button className="all-buttons --gradiant-button" onClick={() => history.push('/log-in')}>Log In</button>
          </div>
          <div>
            Need an account? <Link to="/sign-up">Sign Up</Link>
          </div>
        </div>
      </div>
    );
  }
};

export default ResetPasswordPage;
