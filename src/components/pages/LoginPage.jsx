import TextInput from "../common/TextInput";
import { useAuth } from "../../custom-hooks/AuthContext";
import { useState } from "react/cjs/react.development";
import { Link, useHistory } from "react-router-dom";
import BackButton from "../common/BackButton";
import { toast } from "react-toastify";
import { auth } from "../firebase";

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
        success: `${
          auth.currentUser.displayName
            ? `Welcome ${auth.currentUser.displayName}`
            : `Welcome`
        }`,
        error: "Failed to login",
      });
      if (history.location.reauthenticate) history.push("/account");
      else history.push("/");
    } catch (err) {
      setError("The email or password is incorrect");
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {history.location.reauthenticate ? (
        <div className="__top-group flex flex-ai-c flex-jc-sb">
          <BackButton />
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <TextInput
          name={"email"}
          label={"email"}
          type={"email"}
          instructions={""}
          autoFocus={true}
          onChange={(e) => handleChange(e.target)}
          placeholder="&#xf0e0;"
          error={error}
        />
        <TextInput
          name={"password"}
          label={"password"}
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
        <button
          className="all-buttons --gradiant-button"
          type="submit"
          disabled={loading}
        >
          Log In
        </button>
        <br />
        <div>
          Need an account? <Link to="/sign-up">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
