import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Joi from "joi-browser";
import TextInput from "../common/TextInput";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";
import { auth } from "../firebase";

const Signup = () => {
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const history = useHistory();

  const schema = {
    name: Joi.string().required().label("Display Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
    passwordConfirm: Joi.string().required().label("Password Confirm"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(formData, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const propertySchema = { [name]: schema[name] };
    const { errors } = Joi.validate(obj, propertySchema);
    return errors ? errors.details[0].message : null;
  };

  const handleChange = (input) => {
    const errors = { ...error };
    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    let data = { ...formData };
    data[input.name] = input.value;
    setFormData(data);
    setError(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    setError(errors || {});
    if (errors) return;

    if (formData.password !== formData.passwordConfirm) {
      return setError({ ...errors, passwordConfirm: "Passwords do not match" });
    }

    setLoading(true);
    await toast
      .promise(
        auth
          .createUserWithEmailAndPassword(formData.email, formData.password)
          .then((res) => {
            const user = auth.currentUser;
            return user.updateProfile({
              displayName: formData.name,
              photoURL: `https://avatars.dicebear.com/api/avataaars/${Date.now()}.svg`,
            });
          }),
        {
          pending: "Creating your account",
          success: `Welcome ${formData.name}`,
          error: "Failed to create your account",
        }
      )
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        setError({ ...error, email: "Email is already in use" });
        setLoading(false);
      });
  };

  if (loading)
    return (
      <div
        style={{ height: "100vh", display: "flex", justifyContent: "center" }}
      >
        <Spinner />
      </div>
    );
  return (
    <div className="signup-page">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <TextInput
          name={"name"}
          label={"display name"}
          type={"text"}
          instructions={"Other users will see this in your comments and posts"}
          autoFocus={true}
          defaultValue={formData.name && formData.name}
          onChange={(e) => handleChange(e.target)}
          error={error.hasOwnProperty("name") && error["name"]}
        />
        <TextInput
          name={"email"}
          label={"email"}
          type={"email"}
          defaultValue={formData.email && formData.email}
          instructions={"Your email is hidden from other users"}
          onChange={(e) => handleChange(e.target)}
          error={error.hasOwnProperty("email") && error["email"]}
        />
        <TextInput
          name={"password"}
          label={"password"}
          type={"password"}
          defaultValue={formData.password && formData.password}
          onChange={(e) => handleChange(e.target)}
          error={error.hasOwnProperty("password") && error["password"]}
        />
        <TextInput
          name={"passwordConfirm"}
          label={"password confirmation"}
          type={"password"}
          defaultValue={formData.passwordConfirm && formData.passwordConfirm}
          onChange={(e) => handleChange(e.target)}
          error={
            error.hasOwnProperty("passwordConfirm") && error["passwordConfirm"]
          }
        />
        <button
          className="all-buttons --gradiant-button"
          type="submit"
          disabled={validate()}
        >
          Sign Up
        </button>
        <div>
          Already have an account? <Link to="/log-in">Log In</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
