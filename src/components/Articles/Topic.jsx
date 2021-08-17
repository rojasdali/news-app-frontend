import React from "react";
import { useParams } from "react-router-dom";

const Topic = () => {
  const { country } = useParams();

  return (
    <div className="topic-wrapper mb-3">
      <h1 className="text-capitalize topic">{country} News</h1>
    </div>
  );
};

export default Topic;
