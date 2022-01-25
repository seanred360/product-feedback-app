import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Joi from "joi-browser";
import BackButton from "../common/BackButton";
import TextInput from "../common/TextInput";
import Select from "../common/Select";
import TextArea from "../common/TextArea";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../custom-hooks/AuthContext";

const NewFeedbackPage = () => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [formData, setFormData] = useState({
    author: currentUser.email,
    title: "",
    category: "Feature",
    upvotes: 0,
    status: "suggestion",
    description: "",
    comments: [],
  });
  const [error, setError] = useState({});

  const schema = {
    author: Joi.string().required(),
    title: Joi.string().required().label("Feedback Title"),
    category: Joi.string().required().label("Feedback Category"),
    upvotes: Joi.number().integer(),
    status: Joi.string(),
    description: Joi.string().required().label("Feedback Description"),
    comments: Joi.array(),
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
    setError(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setError(error || {});
    if (errors) {
      toast.error("Please fill in the required fields.");
      return;
    }
    axios
      .post(`https://product-feedback-rest-api.herokuapp.com/productrequests`, {
        author: formData.author,
        title: formData.title,
        category: formData.category,
        upvotes: 0,
        status: "suggeston",
        description: formData.description,
        comments: [],
      })
      .then(function (response) {
        console.log(response);
        toast.success("Thanks for your feedback!");
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
        toast.error("400 Bad Request Error");
      });
  };

  return (
    <div className="new-feedback-page">
      <ToastContainer />
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

export default NewFeedbackPage;
