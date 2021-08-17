import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useApi } from "../../hooks/useApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICONS } from "./constants";
import env from "../../environment";

const CategoryNav = () => {
  const { country } = useParams();
  const [{ loading, result, error }, getCategories] = useApi(
    "GET",
    `${env.API_BASE_URL}/categories`
  );

  const baseRoute = `/news/country/${country}`;

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const { data: categories } = result;

  if (loading) return <div className="text-center">Loading Categories...</div>;
  if (error) return <h4>{error}</h4>;

  return (
    <Container className="d-flex justify-content-center">
      <nav className="category-nav-wrapper">
        <div className="navbar">
          {categories.map((category) => {
            const icon = ICONS[category];
            return (
              <OverlayTrigger
                key={category}
                placement="top"
                overlay={<Tooltip>{category}</Tooltip>}
              >
                <NavLink
                  activeClassName="selected"
                  to={`${baseRoute}/category/${category}`}
                >
                  <FontAwesomeIcon icon={icon} size="2x" />
                </NavLink>
              </OverlayTrigger>
            );
          })}
        </div>
      </nav>
    </Container>
  );
};

export default CategoryNav;
