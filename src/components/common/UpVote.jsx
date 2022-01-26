import React from "react";
import { GoChevronUp } from "react-icons/go";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react/cjs/react.development";

const UpVote = ({ upvotes, product }) => {
  const [upvotesState, setUpvotesState] = useState(upvotes);

  const handleClick = (e) => {
    e.stopPropagation();

    axios
      .patch(
        `https://product-feedback-rest-api.herokuapp.com/productrequests/${product._id}`,
        {
          upvotes: upvotesState + 1,
        }
      )
      .then(function (response) {
        console.log(response);
        setUpvotesState(upvotesState + 1);
        toast.success("Up vote successful!");
      })
      .catch(function (error) {
        toast.error("Failed to up vote");
      });
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
