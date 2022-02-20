import { useState } from "react";
import { useHistory } from "react-router-dom";
import Joi from "joi-browser";
import { auth } from "../firebase";
import { useAuth } from "../../custom-hooks/AuthContext";
import BackButton from "../common/BackButton";
import TextInput from "../common/TextInput";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

const EditAccountNamePage = () => {
  const { displayName } = auth.currentUser;
  const { updateDisplayName } = useAuth();
  const history = useHistory();
  const [formData, setFormData] = useState(displayName);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await toast.promise(updateDisplayName({ displayName: formData }), {
        pending: "Updating your name",
        success: `Your new name is ${formData}`,
        error: "Failed to update your name",
      });
      history.push("/account");
    } catch (err) {
      setError("Something went wrong");
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
            instructions={"Change your display name"}
            defaultValue={displayName}
            onChange={(e) => setFormData(e.target.value)}
            autoFocus={true}
            required={true}
            placeholder="&#xf2bd;"
            error={error}
          />
        )}
        {loading ? (
          <span className="--loading-message">Updating your name</span>
        ) : (
          "Anyone can see your display name on your comments and posts."
        )}
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
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAccountNamePage;
