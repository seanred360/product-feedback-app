import React from "react";
import AddFeedbackButton from "./AddFeedbackButton";
import DropDownBox from "./common/DropDownBox";

const ToolBar = ({ dataToSort, setData }) => {
  return (
    <div className="nav-bar2__container">
      <div className="nav-bar2 flex flex-jc-sb flex-ai-c">
        <div className="__left-content flex">
          <DropDownBox dataToSort={dataToSort} setData={setData} />
        </div>
        <AddFeedbackButton />
      </div>
    </div>
  );
};

export default ToolBar;
