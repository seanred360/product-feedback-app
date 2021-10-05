import React from "react";
import imageElijah from "../starter-code/assets/user-images/image-elijah.jpg";

const Comment = () => {
  return (
    <div className="comment">
      <div className="__user flex">
        <img
          className="--user-image"
          src={imageElijah}
          alt="user image"
          className="--user-image"
        />
        <div className="--user-text">
          <span className="--user-name"></span>Elijah Moss
          <span className="--user-alias">@hexagon.bestagon</span>
        </div>
        <button className="--reply-button all-buttons">Reply</button>
      </div>
      <p className="__content">
        Also, please allow styles to be applied based on system preferences. I
        would love to be able to browse Frontend Mentor in the evening after my
        device’s dark mode turns on without the bright background it currently
        has.
      </p>
    </div>
  );
};

export default Comment;
