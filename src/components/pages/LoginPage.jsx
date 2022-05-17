import TextInput from "../common/TextInput";
import { useAuth } from "../../custom-hooks/AuthContext";
import { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import BackButton from "../common/BackButton";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import PageSpinner from "../common/PageSpinner";

const LoginPage = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  const handleChange = (input) => {
    let data = { ...formData };
    data[input.name] = input.value;
    setFormData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await toast.promise(login(formData.email, formData.password), {
        pending: "Logging you in",
        success: "Welcome",
        error: "Failed to login",
      });
      if (history.location.reauthenticate) history.push("/account");
      else history.replace("/");
    } catch (err) {
      setError("The email or password is incorrect");
      setLoading(false);
    }
  };

  if (loading) return <PageSpinner />;
  if (auth.currentUser && !history.location.reauthenticate)
    return <Redirect to="/" />;
  return (
    <div className="login-page">
      {history.location.reauthenticate ? (
        <div className="__top-group flex flex-ai-c flex-jc-sb">
          <BackButton />
        </div>
      ) : null}
      <form className="__login-form" onSubmit={handleSubmit}>
        <div className="__top">
          <h1>Login</h1>
        </div>

        <TextInput
          name={"email"}
          label={"Email"}
          type={"email"}
          instructions={""}
          autoFocus={true}
          onChange={(e) => handleChange(e.target)}
          placeholder="&#xf0e0;"
          error={error}
        />
        <TextInput
          name={"password"}
          label={"Password"}
          type={"password"}
          instructions={""}
          onChange={(e) => handleChange(e.target)}
          placeholder="&#xf084;"
          error={error}
        />
        <div className="__forgot-password">
          {history.location.reauthenticate ? (
            <Link to={{ pathname: "/reset-password", reauthenticate: true }}>
              Forgot Password?
            </Link>
          ) : (
            <Link to={{ pathname: "/reset-password" }}>Forgot Password?</Link>
          )}
        </div>
        <div className="__bottom">
          <button
            className="all-buttons --gradiant-button"
            type="submit"
            disabled={loading}
          >
            Log In
          </button>
          {history.location.reauthenticate ? null : (
            <div>
              <p>
                Need an account? <Link to="/sign-up">Sign Up</Link>
              </p>
              <span>
                Or use:
                <br /> email: "guest@fake.com"
                <br /> password: "123456"
              </span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
