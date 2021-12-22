import React from "react";
import AddFeedbackButton from "./AddFeedbackButton";
import DropDownBox from "./common/DropDownBox";

const NavBar2 = () => {
  const filterCategories = [
    "Most Upvotes",
    "Least Upvotes",
    "Most Comments",
    "Least Comments",
  ];

  return (
    <div className="nav-bar2__container">
      <div className="nav-bar2 flex flex-jc-sb flex-ai-c">
        <div className="__left-content flex">
          <DropDownBox dropdownItems={filterCategories} />
        </div>
        <AddFeedbackButton />
      </div>
    </div>
  );
};

export default NavBar2;
