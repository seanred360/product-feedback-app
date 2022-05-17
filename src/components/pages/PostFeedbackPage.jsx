import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Joi from "joi-browser";
import BackButton from "../common/BackButton";
import TextInput from "../common/TextInput";
import Select from "../common/Select";
import TextArea from "../common/TextArea";
import { toast } from "react-toastify";
import { useAuth } from "../../custom-hooks/AuthContext";
import PageSpinner from "../common/PageSpinner";

const PostFeedbackPage = () => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: "",
    category: "Feature",
    description: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const schema = {
    title: Joi.string().required().label("Feedback Title"),
    category: Joi.string().required().label("Feedback Category"),
    description: Joi.string().required().label("Feedback Description"),
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
    console.log(input.value);
    const errors = { ...error };
    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...formData };
    data[input.name] = input.value;

    setFormData(data);
    setError(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    setError(error || {});
    if (errors) {
      toast.error("Please fill in the required fields.");
      return;
    }

    setLoading(true);
    await toast
      .promise(
        axios.post(process.env.REACT_APP_MONGO_URL, {
          title: formData.title,
          author: currentUser.uid,
          category: formData.category,
          description: formData.description,
        }),
        {
          pending: "Posting your feedback",
          success: `Thanks for your feedback!`,
          error: "Failed to post your feedback",
        }
      )
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  if (loading) return <PageSpinner />;
  return (
    <div className="post-feedback-page">
      <div className="__top-group flex flex-ai-c flex-jc-sb">
        <BackButton />
      </div>
      <div className="feedback-window">
        <div className="__plus-circle">+</div>
        <h1 className="__header">Create New Feedback</h1>
        <form onSubmit={handleSubmit}>
          <TextInput
            name={"title"}
            label={"Feedback Title"}
            instructions={"Add a short, descriptive headline"}
            autoFocus={true}
            onChange={(e) => handleChange(e.target)}
            error={error.hasOwnProperty("title") && error["title"]}
          />
          <Select
            name={"category"}
            label={"Category"}
            instructions={"Choose a category for your feedback"}
            items={["Feature", "UI", "UX", "Enhancement", "Bug"]}
            onChange={(e) => handleChange(e.target)}
            error={error.hasOwnProperty("category") && error["category"]}
          />
          <TextArea
            name={"description"}
            label={"Feedback Description"}
            instructions={
              "Include any specific comments on what should be improved, added,etc."
            }
            cols={30}
            rows={10}
            onChange={(e) => handleChange(e.target)}
            error={error.hasOwnProperty("description") && error["description"]}
          />

          <div className="__buttons flex flex-jc-c flex-ai-c">
            <button
              className="all-buttons --purple-button"
              type="submit"
              disabled={validate()}
            >
              Add Feedback
            </button>
            <button
              className="all-buttons --blue-grey2-button"
              type="button"
              onClick={history.goBack}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostFeedbackPage;
