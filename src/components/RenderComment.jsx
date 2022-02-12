import React from "react";
import RenderReply from "./RenderReply";
import PostReply from "./PostReply";
import { useState } from "react/cjs/react.development";

const RenderComment = ({ id, userImage, userName, content, replies }) => {
  const [toggleReply, setToggleReply] = useState(false);

  return (
    <div className="comment">
      <div className="__user flex">
        <img
          className="--user-image"
          src={process.env.PUBLIC_URL + userImage}
          alt="user"
        />
        <div className="--user-text">
          <span className="--user-name">{userName}</span>
        </div>
        <button
          className="--reply-button all-buttons"
          onClick={() => setToggleReply(!toggleReply)}
        >
          Reply
        </button>
      </div>
      <p className="__content">{content}</p>
      <div style={toggleReply ? { display: "unset" } : { display: "none" }}>
        <PostReply targetComment={id} replyingTo={userName} />
      </div>
      <div className="__replies">
        {replies &&
          replies.map((reply) => <RenderReply key={reply._id} reply={reply} />)}
      </div>
    </div>
  );
};

export default RenderComment;
