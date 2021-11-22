import React, { useState } from "react";
import NavBar from "./common/NavBar";
import MobileMenu from "./MobileMenu";
import NavBar2 from "./NavBar2";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="menu">
      <NavBar onOpen={() => setIsOpen(!isOpen)} />
      <MobileMenu isOpen={isOpen} />
      <NavBar2 />
    </div>
  );
};

export default Menu;
