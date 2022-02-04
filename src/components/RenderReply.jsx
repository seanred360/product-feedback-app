import React from "react";

const RenderReply = ({ reply }) => {
  const { content: replyContent, replyingTo } = reply;
  const { image: replyImage, name: replyUserName } = reply.user;

  return (
    <div className="reply-comment">
      <div className="__user flex">
        <img className="--user-image" src={replyImage} alt="user" />
        <div className="--user-text">
          <span className="--user-name">{replyUserName}</span>
        </div>
        {/* <button className="--reply-button all-buttons">Reply</button> */}
      </div>
      <p className="__content">
        <span className="--replying-to">@{replyingTo}</span> {replyContent}
      </p>
    </div>
  );
};

export default RenderReply;
