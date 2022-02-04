import { GoChevronUp } from "react-icons/go";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { auth } from "../firebase";

const UpVote = ({ upvotesCount, feedback }) => {
  const [upvotesState, SetUpvotesState] = useState(upvotesCount);

  const handleClick = (e) => {
    e.stopPropagation();
    try {
      axios
        .patch(`${process.env.REACT_APP_MONGO_URL}/upvote/${feedback._id}`, [
          auth.currentUser.email,
        ])
        .then(function (response) {
          console.log(response);
          SetUpvotesState(upvotesState + 1);
          toast.success("Up vote successful!");
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
    >
      <GoChevronUp />
      <span className="__quantity">{upvotesState}</span>
    </button>
  );
};

export default UpVote;
