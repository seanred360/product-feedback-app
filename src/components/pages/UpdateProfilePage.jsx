import TextInput from "../common/TextInput";
import { useAuth } from "../../custom-hooks/AuthContext";
import { useState } from "react/cjs/react.development";
import { Link, useHistory } from "react-router-dom";

const UpdateProfilePage = () => {
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm)
      return setError("Passwords do not match");

    const promises = [];
    setLoading(true);
    setError("");
    if (formData.email !== currentUser.email) {
      promises.push(updateEmail(formData.email));
    }
    if (formData.password !== currentUser.password) {
      promises.push(updatePassword(formData.password));
    }

    Promise.all(promises)
      .then(() => {})
      .catch(() => {
        setError("failed to update account");
      })
      .finally(() => {
        setLoading(false);
        history.push("/");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Profile</h1>
      <TextInput
        name={"email"}
        label={"email"}
        type={"email"}
        defaultValue={currentUser.email}
        instructions={""}
        required={true}
        autoFocus={true}
        onChange={(e) => handleChange(e.target)}
        error={error}
      />
      <TextInput
        name={"password"}
        label={"password"}
        type={"password"}
        instructions={""}
        placeholder={"Leave blank to keep the same password"}
        autoFocus={true}
        onChange={(e) => handleChange(e.target)}
        error={error}
      />
      <TextInput
        name={"passwordConfirm"}
        label={"Password Confirmation"}
        type={"password"}
        instructions={""}
        placeholder={"Leave blank to keep the same password"}
        autoFocus={true}
        onChange={(e) => handleChange(e.target)}
        error={error}
      />
      <button type="submit" disabled={loading}>
        Update
      </button>
      <div>
        <Link to="/">Cancel</Link>
      </div>
    </form>
  );
};

export default UpdateProfilePage;
