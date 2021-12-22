import React, { useState, useContext } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { BiCheck } from "react-icons/bi";
import { DataContext } from "../../custom-hooks/Contexts";
import _ from "lodash";

const DropDownBox = ({ dropdownItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { productRequests, setFilteredProducts } = useContext(DataContext);
  const reorderedProductRequests = productRequests;

  const handleClick = (sortCategory) => {
    if (sortCategory.toLowerCase() === "most upvotes") sortByMostUpvotes();
    if (sortCategory.toLowerCase() === "least upvotes") sortByLeastUpvotes();
    if (sortCategory.toLowerCase() === "most comments") sortByMostComments();
    if (sortCategory.toLowerCase() === "least comments") sortByLeastComments();
  };

  const sortByMostUpvotes = () => {
    reorderedProductRequests.sort((a, b) => {
      return b.upvotes - a.upvotes;
    });
    setFilteredProducts([...reorderedProductRequests]); // must use spread operator or React won't re render
  };
  const sortByLeastUpvotes = () => {
    reorderedProductRequests.sort((a, b) => {
      return a.upvotes - b.upvotes;
    });
    setFilteredProducts([...reorderedProductRequests]); // must use spread operator or React won't re render
  };
  const sortByMostComments = () => {
    reorderedProductRequests.sort((a, b) => {
      return _.size(b.comments) - _.size(a.comments);
    });
    setFilteredProducts([...reorderedProductRequests]); // must use spread operator or React won't re render
  };
  const sortByLeastComments = () => {
    reorderedProductRequests.sort((a, b) => {
      return _.size(a.comments) - _.size(b.comments);
    });
    setFilteredProducts([...reorderedProductRequests]); // must use spread operator or React won't re render
  };

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
              onClick={() => handleClick(item)}
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
