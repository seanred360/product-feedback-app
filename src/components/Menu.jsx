import React, { useState } from "react";
import Logo from "./common/Logo";
import MobileSlideOut from "./MobileSlideOut";
import ToolBar from "./ToolBar";

const Menu = ({ dataToSort, setData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="menu">
      <Logo onOpen={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      <MobileSlideOut
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dataToSort={dataToSort}
        setData={setData}
      />
      <ToolBar dataToSort={dataToSort} setData={setData} />
    </div>
  );
};

export default Menu;
