import { useState } from "react";
import axios from "axios";
import { auth } from "./firebase";
import { useHistory, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import TextArea from "./common/TextArea";

const PostComment = ({ targetFeedback }) => {
  const history = useHistory();
  const match = useRouteMatch();
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    content: "",
    user: {
      image: auth.currentUser.photoURL,
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
    },
  });

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
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
    axios
      .patch(
        `${process.env.REACT_APP_MONGO_URL}/postcomment/${match.params.slug}`,
        {
          content: formData.content,
          user: formData.user,
        }
      )
      .then(function (response) {
        toast.success("Post comment successful!");
        history.go();
      })
      .catch(function (error) {
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

export default PostComment;
