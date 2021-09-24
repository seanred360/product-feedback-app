import React from "react";
import CategoryButton from "../common/CategoryButton";
import UpVote from "../common/UpVote";
import DropDownBox from "../common/DropDownBox";

const HomePage = () => {
  const items = [
    "Most Upvotes",
    "Least Upvotes",
    "Most Comments",
    "Least Comments",
  ];
  return (
    <div className="home-page">
      <h1>homepage</h1>
      <UpVote />
      <CategoryButton />
      <DropDownBox dropdownItems={items} />
    </div>
  );
};

export default HomePage;
