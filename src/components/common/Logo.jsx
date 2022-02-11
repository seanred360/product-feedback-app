import React from "react";
import HamburgerButton from "./HamburgerButton";

const Logo = ({ onOpen, isOpen }) => {
  return (
    <div className="nav-bar__container">
      <nav className="nav-bar flex flex-jc-sb flex-ai-c">
        <div className="__left-content flex">
          <span className="__app-name">Frontend Mentor</span>
          <span className="__app-label">Feedback Board</span>
        </div>
        <HamburgerButton onOpen={onOpen} isOpen={isOpen} />
      </nav>
    </div>
  );
};

export default Logo;
