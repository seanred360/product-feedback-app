import { GoChevronUp } from "react-icons/go";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { auth } from "../firebase";

const UpVote = ({ feedback }) => {
  const [upvotesState, setUpvotesState] = useState(feedback.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(
    upvotesState.includes(auth.currentUser.email)
  );

  const handleClick = (e) => {
    e.stopPropagation();
    try {
      axios
        .patch(
          `${process.env.REACT_APP_MONGO_URL}/postupvote/${feedback._id}`,
          [auth.currentUser.email]
        )
        .then(function (response) {
          setUpvotesState([...upvotesState, auth.currentUser.email]);
          toast.success("Up vote successful!");
          setHasUpvoted(true);
        });
    } catch (error) {
      toast.error("Failed to up vote");
    }
  };

  return (
    <button
      className="up-vote"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
      disabled={hasUpvoted ? true : false}
    >
      <GoChevronUp />
      <span className="__quantity">{upvotesState.length}</span>
    </button>
  );
};

export default UpVote;
