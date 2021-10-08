import React from "react";

const AddComment = () => {
  return (
    <div className="add-comment">
      <h2 className="__header">Add Comment</h2>{" "}
      <form action="">
        <input type="text" placeholder="Type your comment here" />
      </form>
      <div className="__bottom flex flex-ai-c flex-jc-sb">
        <span className="--characters-remaining">250 Characters left</span>
        <button className="all-buttons --purple-button">Post Comment</button>
      </div>
    </div>
  );
};

export default AddComment;
