import React from "react";
import CategoryButton from "./common/CategoryButton";

const MobileMenu = ({ isOpen }) => {
  const items = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

  return (
    <>
      <div className={`fade-overlay ${isOpen ? `--open` : ``}`}></div>
      <div className={`mobile-menu-container ${isOpen ? `--open` : ``}`}>
        <div className="__mobile-menu">
          <div className="--menu-top">
            {items.map((item) => (
              <CategoryButton key={item} itemName={item} />
            ))}
          </div>
          <div className="--menu-bottom">
            <span className="--menu-bottom-title">Roadmap</span>
            <a href="/road-map" className="--menu-bottom-view">
              View
            </a>

            <ul>
              <li>
                <span className="--dot -peach"></span>
                Planned
                <span className="--number">2</span>
              </li>
              <li>
                <span className="--dot -purple"></span>
                In-Progress <span className="--number">3</span>
              </li>
              <li>
                <span className="--dot -light-blue"></span>
                Live <span className="--number">1</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
