import React from "react";
import { Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

// wanted to learn a skeleton loader which i have
// never used before

// could have just had a spinning circle or progress bar returned on loading
// in the parent ArticlesList
const ArticleCard = ({
  article: { url, title, urlToImage, author, publishedAt, description },
  loading,
}) => {
  return (
    <div className="article-card-wrapper">
      <a href={url} rel="noopener noreferrer" target="_blank">
        <Card className="rounded">
          <Card.Header as="h4">{loading ? <Skeleton /> : title}</Card.Header>
          {loading ? (
            <Skeleton height={500} />
          ) : (
            urlToImage && <Card.Img variant="top" src={urlToImage} />
          )}
          <Card.Body>
            <Card.Title>
              {loading ? <Skeleton /> : author && `By: ${author}`}
            </Card.Title>
            <small className="text-muted">
              <b>
                Published:{" "}
                {new Date(loading ? <Skeleton /> : publishedAt).toDateString()}
              </b>
            </small>
            <Card.Text>
              {loading ? <Skeleton count={5} /> : description}
            </Card.Text>
          </Card.Body>
        </Card>
      </a>
    </div>
  );
};

export default ArticleCard;
