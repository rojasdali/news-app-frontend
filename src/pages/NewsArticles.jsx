import React from "react";
import { Container } from "react-bootstrap";
import ArticlesList from "../components/Articles/ArticleList";
import Topic from "../components/Articles/Topic";
import CategoryNav from "../components/Articles/CategoryNav";

const NewsArticles = ({ countries, search }) => (
  <Container className="news-articles-wrapper">
    <Topic />
    <CategoryNav />
    <ArticlesList countries={countries} search={search} />
  </Container>
);

export default NewsArticles;
