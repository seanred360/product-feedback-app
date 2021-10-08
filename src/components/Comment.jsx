// import React from "react";

// const Comment = ({ userImage, userName, userAlias, content, replies }) => {
//   return (
//     <div className="comment">
//       <div className="__user flex">
//         <img
//           className="--user-image"
//           src={process.env.PUBLIC_URL + userImage}
//           alt="user"
//           className="--user-image"
//         />
//         <div className="--user-text">
//           <span className="--user-name">{userName}</span>
//           <span className="--user-alias">{userAlias}</span>
//         </div>
//         <button className="--reply-button all-buttons">Reply</button>
//       </div>
//       <p className="__content">{content}</p>
//     </div>
//   );
// };

// export default Comment;

import React, { Component } from "react";
import ReplyComment from "./ReplyComment";

class Comment extends Component {
  render() {
    const { userImage, userName, userAlias, content, replies } = this.props;

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
        <div className="__replies">
          {replies &&
            replies.map((reply) => (
              <ReplyComment key={reply["content"]} reply={reply} />
            ))}
        </div>
      </div>
    );
  }
}

export default Comment;
