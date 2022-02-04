import { useState } from "react";
import axios from "axios";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import TextArea from "./common/TextArea";

const PostReply = ({ targetComment, replyingTo }) => {
  const history = useHistory();
  const [error, setError] = useState();
  const [formData, setFormData] = useState("");

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

    setFormData(input.value);
    setError(errors);
  };

  const handlePostReply = () => {
    axios
      .patch(`${process.env.REACT_APP_MONGO_URL}/postreply/${targetComment}`, {
        content: formData,
        replyingTo: replyingTo,
        user: {
          image: auth.currentUser.photoURL,
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
        },
      })
      .then(function (response) {
        toast.success("Post reply successful!");
        history.go();
      })
      .catch(function (error) {
        toast.error("Failed to post reply");
      });
  };

  return (
    <div className="add-comment">
      <h2 className="__header">Replying to</h2>
      <form>
        <TextArea
          name="comment"
          type="text"
          placeholder="Type your reply here"
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
          onClick={handlePostReply}
        >
          Post Reply
        </button>
      </div>
    </div>
  );
};

export default PostReply;
