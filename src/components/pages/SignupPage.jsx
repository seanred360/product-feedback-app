import TextInput from "../common/TextInput";
import { useAuth } from "../../custom-hooks/AuthContext";
import { useState } from "react/cjs/react.development";
import { Link, useHistory } from "react-router-dom";
import Joi from "joi-browser";

const Signup = () => {
  const { signup } = useAuth();
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
    console.log(errors);
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

    if (formData.password !== formData.passwordConfirm)
      return setError({ ...errors, passwordConfirm: "Passwords do not match" });

    try {
      setLoading(true);
      await signup(formData.name, formData.email, formData.password);
      history.push("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

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
          onChange={(e) => handleChange(e.target)}
          error={error.hasOwnProperty("name") && error["name"]}
        />
        <TextInput
          name={"email"}
          label={"email"}
          type={"email"}
          instructions={"Your email is hidden from other users"}
          onChange={(e) => handleChange(e.target)}
          error={error.hasOwnProperty("email") && error["email"]}
        />
        <TextInput
          name={"password"}
          label={"password"}
          type={"password"}
          onChange={(e) => handleChange(e.target)}
          error={error.hasOwnProperty("password") && error["password"]}
        />
        <TextInput
          name={"passwordConfirm"}
          label={"password confirmation"}
          type={"password"}
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
