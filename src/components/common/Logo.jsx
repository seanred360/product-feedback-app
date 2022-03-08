import React from "react";
import HamburgerButton from "./HamburgerButton";

const Logo = ({ onOpen, isOpen }) => {
  return (
    <div className="logo-container">
      <div className="logo">
        <div className="__left-content">
          <span className="__app-name">seanred.io</span>
          <span className="__app-label">Feedback Board</span>
        </div>
        <HamburgerButton onOpen={onOpen} isOpen={isOpen} />
      </div>
    </div>
  );
};

export default Logo;
