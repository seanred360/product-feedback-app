import React, { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { BiCheck } from "react-icons/bi";
import _ from "lodash";
import { DateTime } from "luxon";

const SortDropDown = ({ dataToSort, setData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("Newest");
  const reorderedProductRequests = dataToSort;
  const filterCategories = [
    "Newest",
    "Oldest",
    "Most Upvotes",
    "Least Upvotes",
    "Most Comments",
    "Least Comments",
  ];

  const handleClick = (sortCategory) => {
    if (sortCategory.toLowerCase() === "newest") sortByNewest();
    if (sortCategory.toLowerCase() === "oldest") sortByOldest();
    if (sortCategory.toLowerCase() === "most upvotes") sortByMostUpvotes();
    if (sortCategory.toLowerCase() === "least upvotes") sortByLeastUpvotes();
    if (sortCategory.toLowerCase() === "most comments") sortByMostComments();
    if (sortCategory.toLowerCase() === "least comments") sortByLeastComments();
    setIsOpen(false);
    setCurrentFilter(sortCategory);
  };

  const sortByNewest = () => {
    reorderedProductRequests.sort((a, b) => {
      return new DateTime.fromISO(b.date) - new DateTime.fromISO(a.date);
    });
    setData([...reorderedProductRequests]); // must use spread operator or React won't re render
  };
  const sortByOldest = () => {
    reorderedProductRequests.sort((a, b) => {
      return new DateTime.fromISO(a.date) - new DateTime.fromISO(b.date);
    });
    setData([...reorderedProductRequests]); // must use spread operator or React won't re render
  };
  const sortByMostUpvotes = () => {
    reorderedProductRequests.sort((a, b) => {
      return b.upvotes.length - a.upvotes.length;
    });
    setData([...reorderedProductRequests]); // must use spread operator or React won't re render
  };
  const sortByLeastUpvotes = () => {
    reorderedProductRequests.sort((a, b) => {
      return a.upvotes.length - b.upvotes.length;
    });
    setData([...reorderedProductRequests]); // must use spread operator or React won't re render
  };
  const sortByMostComments = () => {
    reorderedProductRequests.sort((a, b) => {
      return _.size(b.comments) - _.size(a.comments);
    });
    setData([...reorderedProductRequests]); // must use spread operator or React won't re render
  };
  const sortByLeastComments = () => {
    reorderedProductRequests.sort((a, b) => {
      return _.size(a.comments) - _.size(b.comments);
    });
    setData([...reorderedProductRequests]); // must use spread operator or React won't re render
  };

  return (
    <div className="sort-dropdown">
      <button
        className="dropdown-toggle"
        aria-label="Sort"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span className="--sort-btn flex flex-ai-c">
          Sort by : <span className="--sort-text"> {currentFilter}</span>
          {isOpen ? (
            <div className="chevron">
              <GoChevronUp />
            </div>
          ) : (
            <span className="chevron">
              <GoChevronDown />
            </span>
          )}
        </span>
      </button>
      <ul
        className={`dropdown-menu has-fade ${isOpen ? "fade-in" : "fade-out"}`}
      >
        {filterCategories.map((item) => (
          <li key={item}>
            <button
              className={
                currentFilter === item
                  ? "dropdown-item flex flex-jc-sb --selected"
                  : "dropdown-item flex flex-jc-sb"
              }
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

export default SortDropDown;
