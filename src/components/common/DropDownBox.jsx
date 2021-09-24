import React, { Component } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { BiCheck } from "react-icons/bi";

class DropDownBox extends Component {
  state = {
    isOpen: false,
  };

  handleOnClick = (sortCategory, item) => {
    // send the sort values to the parent element
    this.props.onItemSelect(sortCategory, item);
    //open and close the menu
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { dropdownTitle, sortCategory, dropdownItems } = this.props;

    return (
      <div className="dropdown">
        <button
          className="dropdown-toggle"
          aria-label="Sort by : Most Upvotes"
          onClick={() => {
            this.setState({ isOpen: !this.state.isOpen });
          }}
        >
          <span className="--sort-by flex flex-ai-c">
            Sort by : <span className="--most-upvotes"> Most Upvotes</span>
            <div className="chevron">
              <GoChevronDown
                style={{ display: this.state.isOpen ? "none" : "block" }}
              />
              <GoChevronUp
                style={{ display: this.state.isOpen ? "block" : "none" }}
              />
            </div>
          </span>
        </button>
        <ul
          className="dropdown-menu"
          style={{ display: this.state.isOpen ? "block" : "none" }}
        >
          {dropdownItems.map((item) => (
            <li key={item}>
              <button
                className="dropdown-item flex flex-jc-sb"
                aria-label={item}
                onClick={() => this.handleOnClick(sortCategory, item)}
              >
                {item} <BiCheck className="check" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default DropDownBox;
