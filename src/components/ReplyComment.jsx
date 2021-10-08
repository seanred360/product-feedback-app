import React from "react";

const ReplyComment = ({ reply }) => {
  const { content, replyingTo } = reply;
  const {
    image: userImage,
    name: userName,
    username: userAlias,
  } = reply["user"];

  return (
    <div className="reply-comment">
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
      <p className="__content">
        <span className="--replying-to">@{replyingTo}</span> {content}
      </p>
    </div>
  );
};

export default ReplyComment;
