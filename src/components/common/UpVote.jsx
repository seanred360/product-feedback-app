import { GoChevronUp } from "react-icons/go";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { auth } from "../firebase";

const UpVote = ({ upvotes, product }) => {
  const [upvotesState, setUpvotesState] = useState(upvotes);

  const handleClick = (e) => {
    e.stopPropagation();
    if (product.upvotes.includes(auth.email)) return;
    let updatedUpvotes = [...product.upvotes];
    updatedUpvotes.push(auth.currentUser.email);

    axios
      .patch(
        `https://product-feedback-rest-api.herokuapp.com/productrequests/${product._id}`,
        {
          upvotes: updatedUpvotes,
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
