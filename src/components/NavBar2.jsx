import React from "react";
import AddFeedbackButton from "./AddFeedbackButton";
import { GoChevronDown } from "react-icons/go";

const NavBar2 = () => {
  return (
    <div className="nav-bar2__container">
      <div className="nav-bar2 flex flex-jc-sb flex-ai-c">
        <div className="__left-content flex">
          <span className="--sort-by flex flex-ai-c">
            Sort by : <span className="--most-upvotes"> Most Upvotes</span>
            <div className="chevron">
              <GoChevronDown />
            </div>
          </span>
        </div>
        <AddFeedbackButton />
      </div>
    </div>
  );
};

export default NavBar2;
