import TextInput from "../common/TextInput";
import { useAuth } from "../../custom-hooks/AuthContext";
import { useState } from "react/cjs/react.development";
import { Link, useHistory } from "react-router-dom";

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
      await login(formData.email, formData.password);
      history.push("/");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name={"email"}
        label={"Log In"}
        type={"email"}
        instructions={""}
        autoFocus={true}
        onChange={(e) => handleChange(e.target)}
        error={error}
      />
      <TextInput
        name={"password"}
        label={"password"}
        type={"password"}
        instructions={""}
        onChange={(e) => handleChange(e.target)}
        error={error}
      />
      <button type="submit" disabled={loading}>
        Log In
      </button>
      <div>
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
      <div>
        Need an account? <Link to="/sign-up">Sign Up</Link>
      </div>
    </form>
  );
};

export default LoginPage;
