import React from "react";
// import imageElijah from "../starter-code/assets/user-images/image-elijah.jpg";

const Comment = ({ userImage, userName, userAlias, content }) => {
  return (
    <div className="comment">
      <div className="__user flex">
        <img
          className="--user-image"
          src={process.env.PUBLIC_URL + userImage}
          alt="user"
          className="--user-image"
        />
        <div className="--user-text">
          <span className="--user-name">{userName}</span>
          <span className="--user-alias">{userAlias}</span>
        </div>
        <button className="--reply-button all-buttons">Reply</button>
      </div>
      <p className="__content">{content}</p>
    </div>
  );
};

export default Comment;
