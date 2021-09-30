import React, { Component } from "react";
import NavBar from "./common/NavBar";
import MobileMenu from "./MobileMenu";
import NavBar2 from "./NavBar2";

class Menu extends Component {
  state = { isOpen: false };

  handleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div className="menu">
        <NavBar onOpen={this.handleOpen} />
        <MobileMenu isOpen={this.state.isOpen} />
        <NavBar2 />
      </div>
    );
  }
}

export default Menu;
