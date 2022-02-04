import { useState } from "react";
import axios from "axios";
import Joi from "joi-browser";
import BackButton from "../common/BackButton";
import TextInput from "../common/TextInput";
import Select from "../common/Select";
import TextArea from "../common/TextArea";
import { ToastContainer, toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";

const EditFeedbackPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [formData, setFormData] = useState({
    title: location.selectedFeedback.title,
    category: location.selectedFeedback.category,
    description: location.selectedFeedback.description,
  });
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
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setError(errors || {});
    if (errors) {
      toast.error("Please fill in the required fields.");
      return;
    }
    axios
      .patch(
        `${process.env.REACT_APP_MONGO_URL}/edit/${location.selectedFeedback.slug}`,
        {
          title: formData.title,
          category: formData.category,
          description: formData.description,
        }
      )
      .then(function (response) {
        console.log(response);
        toast.success("Edit feedback successful!");
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Failed to edit feedback");
      });
  };

  if (!location.selectedFeedback) {
    history.push("/");
    return null;
  }

  return (
    <div className="edit-feedback-page">
      <ToastContainer />
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
            defaultValue={location.selectedFeedback.title}
            instructions={"Add a short, descriptive headline"}
            autoFocus={true}
            onChange={(e) => handleChange(e.target)}
            error={error.hasOwnProperty("title") && error["title"]}
          />
          <Select
            name={"category"}
            label={"Category"}
            defaultValue={location.selectedFeedback.category}
            instructions={"Choose a category for your feedback"}
            items={["Feature", "UI", "UX", "Enhancement", "Bug"]}
            onChange={(e) => handleChange(e.target)}
            error={error.hasOwnProperty("category") && error["category"]}
          />
          <TextArea
            name={"description"}
            label={"Feedback Description"}
            defaultValue={location.selectedFeedback.description}
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
              onClick={history.goBack}
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
