import React from "react";
import AddFeedbackButton from "./PostFeedbackButton";
import SortDropDown from "./common/SortDropDown";
import { HiOutlineLightBulb } from "react-icons/hi";
import _ from "lodash";

const ToolBar = ({ dataToSort, setData }) => {
  return (
    <div className="toolbar-container">
      <div className="toolbar flex flex-jc-sb flex-ai-c">
        <div className="__left-content flex flex-ai-c">
          <div className="__label flex flex-ai-c">
            <HiOutlineLightBulb />
            <span>{_.size(dataToSort)} Suggestions</span>
          </div>
          <SortDropDown dataToSort={dataToSort} setData={setData} />
        </div>
        <AddFeedbackButton />
      </div>
    </div>
  );
};

export default ToolBar;
