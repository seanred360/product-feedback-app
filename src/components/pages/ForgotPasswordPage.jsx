import TextInput from "../common/TextInput";
import { useAuth } from "../../custom-hooks/AuthContext";
import { useState } from "react/cjs/react.development";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

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
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name={"email"}
        label={"Forgot Password"}
        type={"email"}
        instructions={"Please enter your email to reset your password"}
        required={true}
        autoFocus={true}
        onChange={(e) => handleChange(e.target)}
        error={error}
      />
      {message && <span>{message}</span>}
      <button type="submit" disabled={loading}>
        Reset Password
      </button>
      <div>
        <Link to="/log-in">Login</Link>
      </div>
      <div>
        Need an account? <Link to="/sign-up">Sign Up</Link>
      </div>
    </form>
  );
};

export default ForgotPasswordPage;
