import React from "react";
import ArticleCard from "./ArticleCard";

// returning an ArticleCard component with empty object, to trigger Skeleton UI
// using react-loading-skeleton library
const ArticleLoader = ({ loading, perPage }) =>
  new Array(perPage)
    .fill({}) // empty object
    .map((article, index) => (
      <ArticleCard key={index} article={article} loading={loading} />
    ));

export default ArticleLoader;
