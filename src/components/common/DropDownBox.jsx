import React, { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { BiCheck } from "react-icons/bi";

const DropDownBox = ({ dropdownItems, sortCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  // const handleOnClick = (sortCategory, item) => {
  //   // send the sort values to the parent element
  //   onItemSelect(sortCategory, item);
  //   //open and close the menu
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className="dropdown">
      <button
        className="dropdown-toggle"
        aria-label="Sort by : Most Upvotes"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span className="--sort-by flex flex-ai-c">
          Sort by : <span className="--most-upvotes"> Most Upvotes</span>
          <div className="chevron">
            <GoChevronDown style={{ display: isOpen ? "none" : "block" }} />
            <GoChevronUp style={{ display: isOpen ? "block" : "none" }} />
          </div>
        </span>
      </button>
      <ul
        className="dropdown-menu"
        style={{ display: isOpen ? "block" : "none" }}
      >
        {dropdownItems.map((item) => (
          <li key={item}>
            <button
              className="dropdown-item flex flex-jc-sb"
              aria-label={item}
              // onClick={() => handleOnClick(sortCategory, item)}
            >
              {item} <BiCheck className="check" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDownBox;
