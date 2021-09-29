import React from "react";
import TextInput from "../common/Form";

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
      <TextInput />
    </div>
  );
};

export default HomePage;
