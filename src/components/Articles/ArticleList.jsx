import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import ArticleLoader from "./ArticleLoader";
import { useApi } from "../../hooks/useApi";
import InfiniteScroll from "react-infinite-scroll-component";

import env from "../../environment";

const PER_PAGE = 10;
const DEFAULT_COUNTRY = "GB"; // default

const ArticlesList = ({ countries, search }) => {
  const { category, country: countryName } = useParams();
  const [page, setPage] = useState(1);
  const country = countries[countryName];

  const [{ loading, result, error }, getArticles] = useApi(
    "GET",
    `${env.API_BASE_URL}/articles`
  );

  useEffect(() => {
    getArticles({
      data: {
        country: country || DEFAULT_COUNTRY,
        page,
        perPage: PER_PAGE,
        category,
        query: search,
      },
    });
  }, [getArticles, page, category, country, search]);

  if (loading) return <ArticleLoader loading={loading} perPage={PER_PAGE} />;

  if (error) return <h4>{error}</h4>;
  const { data: { totalResults, articles = [] } = {} } = result;

  if (!articles.length) {
    return <h3 className="mt-3 text-center">Sorry, no news....</h3>;
  }

  return (
    <div className="articles-list-wrapper">
      <InfiniteScroll
        className="scroll"
        dataLength={totalResults}
        next={() => {
          if (page * PER_PAGE >= totalResults) return;
          setPage((prev) => prev + 1);
        }}
        hasMore={!(page * PER_PAGE >= totalResults)}
        scrollThreshold="200px"
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {articles.map((article) => (
          <ArticleCard
            key={`${article.publishedAt}${article.url}`}
            article={article}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ArticlesList;
