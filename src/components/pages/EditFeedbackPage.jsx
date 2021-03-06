import { useState } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import BackButton from "../common/BackButton";
import TextInput from "../common/TextInput";
import Select from "../common/Select";
import TextArea from "../common/TextArea";
import { toast } from "react-toastify";
import PageSpinner from "../common/PageSpinner";

const EditFeedbackPage = () => {
  const history = useHistory();
  const location = useLocation();
  const selectedFeedback = location.selectedFeedback || undefined;
  const [formData, setFormData] = useState({
    title: selectedFeedback && selectedFeedback.title,
    category: selectedFeedback && selectedFeedback.category,
    description: selectedFeedback && selectedFeedback.description,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

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
    const errors = { ...error };
    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...formData };
    data[input.name] = input.value;

    setFormData(data);
    setError(errors);
  };

  const handleDelete = (e) => {
    axios
      .delete(
        `${process.env.REACT_APP_MONGO_URL}/${location.selectedFeedback._id}`
      )
      .then(function (response) {
        toast.success("Feedback deleted successfully!");
        history.push("/");
      })
      .catch(function (error) {
        toast.error("Failed to delete feedback");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    setError(errors || {});
    if (errors) {
      toast.error("Please fill in the required fields.");
      return;
    }

    setLoading(true);
    await toast
      .promise(
        axios.patch(
          `${process.env.REACT_APP_MONGO_URL}/edit/${location.selectedFeedback.slug}`,
          {
            title: formData.title,
            category: formData.category,
            description: formData.description,
          }
        ),
        {
          pending: "Saving your changes",
          success: `Feedback updated!`,
          error: "Failed to save your changes",
        }
      )
      .then(() => {
        history.push({
          pathname: `/${selectedFeedback.slug}`,
          selectedFeedback: selectedFeedback,
        });
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  if (!selectedFeedback) return <Redirect to="/" />;
  if (loading) return <PageSpinner />;
  return (
    <div className="edit-feedback-page">
      <div className="__top-group flex flex-ai-c flex-jc-sb">
        <BackButton />
      </div>
      <div className="feedback-window">
        <div className="__plus-circle">+</div>
        <h1 className="__header">{`Editing Feedback`}</h1>
        <form onSubmit={handleSubmit}>
          <TextInput
            name={"title"}
            label={"Feedback Title"}
            defaultValue={selectedFeedback.title}
            instructions={"Add a short, descriptive headline"}
            autoFocus={true}
            onChange={(e) => handleChange(e.target)}
            error={error.hasOwnProperty("title") && error["title"]}
          />
          <Select
            name={"category"}
            label={"Category"}
            defaultValue={selectedFeedback.category}
            instructions={"Choose a category for your feedback"}
            items={["Feature", "UI", "UX", "Enhancement", "Bug"]}
            onChange={(e) => handleChange(e.target)}
            error={error.hasOwnProperty("category") && error["category"]}
          />
          <TextArea
            name={"description"}
            label={"Feedback Description"}
            defaultValue={selectedFeedback.description}
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
              Save Changes
            </button>
            <button
              className="all-buttons --blue-grey2-button"
              type="button"
              onClick={() =>
                history.push({
                  pathname: `/${selectedFeedback.slug}`,
                  selectedFeedback,
                })
              }
            >
              Cancel
            </button>
            <button
              className="all-buttons --red-button"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFeedbackPage;
