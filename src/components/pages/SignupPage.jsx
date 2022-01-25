import TextInput from "../common/TextInput";
import { useAuth } from "../../custom-hooks/AuthContext";
import { useState } from "react/cjs/react.development";
import { Link, useHistory } from "react-router-dom";

const Signup = () => {
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const history = useHistory();

  const handleChange = (input) => {
    let data = { ...formData };
    data[input.name] = input.value;
    setFormData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm)
      return setError("Passwords do not match");

    try {
      setError("");
      setLoading(true);
      await signup(formData.displayName, formData.email, formData.password);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name={"displayName"}
        label={"Display Name"}
        type={"text"}
        instructions={"Other users will see this in your comments and posts"}
        autoFocus={true}
        onChange={(e) => handleChange(e.target)}
        error={error}
      />
      <TextInput
        name={"email"}
        label={"email"}
        type={"email"}
        instructions={""}
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
      <TextInput
        name={"passwordConfirm"}
        label={"Password Confirmation"}
        type={"password"}
        instructions={""}
        onChange={(e) => handleChange(e.target)}
        error={error}
      />
      <button type="submit" disabled={loading}>
        Sign Up
      </button>
      <div>
        Already have an account? <Link to="/log-in">Log In</Link>
      </div>
    </form>
  );
};

export default Signup;
