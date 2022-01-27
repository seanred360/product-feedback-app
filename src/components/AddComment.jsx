import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../components/firebase";
import { useHistory, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import TextArea from "./common/TextArea";

const AddComment = ({ targetFeedback }) => {
  const history = useHistory();
  const match = useRouteMatch();
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    content: "",
  });

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    console.log(obj);
    const propertySchema = { [name]: Joi.string().required() };
    const { errors } = Joi.validate(obj, propertySchema);
    return errors ? errors.details[0].message : null;
  };

  const handleChange = (input) => {
    const errors = { ...error };
    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...formData };
    data.content = input.value;

    setFormData(data);
    setError(errors);
  };

  const handlePostComment = () => {
    console.log(targetFeedback.comments);
    const updatedComments = [...targetFeedback.comments];
    updatedComments.push({
      content: formData.content,
      id: uuidv4(),
      user: {
        image: auth.currentUser.photoURL,
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
      },
    });
    console.log(updatedComments);
    axios
      .patch(
        `https://product-feedback-rest-api.herokuapp.com/productrequests/${match.params.id}`,
        {
          comments: updatedComments,
        }
      )
      .then(function (response) {
        console.log(response);
        toast.success("Post comment successful!");
        history.go();
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Failed to post comment");
      });
  };

  return (
    <div className="add-comment">
      <h2 className="__header">Add Comment</h2>
      <form>
        <TextArea
          name="comment"
          type="text"
          placeholder="Type your comment here"
          cols={30}
          rows={20}
          onChange={(e) => handleChange(e.target)}
        />
      </form>
      <div className="__bottom flex flex-ai-c flex-jc-sb">
        <span className="--characters-remaining">250 Characters left</span>
        <button
          className="all-buttons --purple-button"
          type="submit"
          onClick={handlePostComment}
        >
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default AddComment;
