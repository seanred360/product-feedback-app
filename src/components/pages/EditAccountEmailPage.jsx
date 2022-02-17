import { useState } from "react";
import { useHistory } from "react-router-dom";
import Joi from "joi-browser";
import { auth } from "../firebase";
import { useAuth } from "../../custom-hooks/AuthContext";
import BackButton from "../common/BackButton";
import TextInput from "../common/TextInput";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";

const EditAccountEmailPage = () => {
  const { email } = auth.currentUser;
  const { updateEmail } = useAuth();
  const history = useHistory();
  const [formData, setFormData] = useState(email);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await toast.promise(updateEmail(formData), {
        pending: "Updating your email",
        success: `Your new email is ${formData}`,
        error: "Failed to update your email",
      });
      history.push("/account");
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        setError("Email is invalid");
      }
      if (err.code === "auth/email-already-in-use") {
        setError("Email is already in use");
      }
      if (err.code === "auth/requires-recent-login") {
        history.push({ pathname: "/log-in", reauthenticate: true });
      }
      setLoading(false);
    }
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(
      formData,
      Joi.string().required().label("Feedback Title"),
      options
    );
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  return (
    <div className="edit-account-page">
      <div className="__top-group flex flex-ai-c flex-jc-sb">
        <BackButton />
      </div>
      <form onSubmit={handleSubmit}>
        {loading ? (
          <Spinner />
        ) : (
          <TextInput
            label={"Name"}
            instructions={"Change your email address"}
            defaultValue={email}
            onChange={(e) => setFormData(e.target.value)}
            autoFocus={true}
            required={true}
            type="email"
            error={error}
          />
        )}

        <div>
          <p>
            {loading
              ? "Updating your email"
              : "Your email is hidden from other users."}
          </p>
        </div>
        <div
          className="__buttons"
          style={loading ? { display: "none" } : { display: "flex" }}
        >
          <button
            className="all-buttons --purple-button"
            type="submit"
            disabled={validate()}
          >
            Save Changes
          </button>
          <button
            className="all-buttons --blue-grey2-button"
            type="button"
            onClick={() => history.push("/account")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAccountEmailPage;
