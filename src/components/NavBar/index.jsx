import React, { useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

import env from "../../environment";

const NavBar = ({ countries, updateSearch }) => {
  const history = useHistory();

  const match = useRouteMatch({
    path: "/news/country/:country/category/:category",
  });

  const [selectedCountry, setSelectedCountry] = useState(
    match?.params?.country || env.DEFAULT_COUNTRY
  );

  const [query, setQuery] = useState("");

  const category = match?.params?.category;

  const onSubmit = (event) => {
    event.preventDefault();
    updateSearch(query);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container className="navbar-wrapper">
        <Link to={`/news/country/${env.DEFAULT_COUNTRY}/category/${category}`}>
          <Navbar.Brand onClick={() => setSelectedCountry(env.DEFAULT_COUNTRY)}>
            <FontAwesomeIcon icon={faNewspaper} size="2x" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title={selectedCountry} id="collasible-nav-dropdown">
              {Object.keys(countries).map((country) => (
                <NavDropdown.Item
                  key={country}
                  onClick={() => {
                    setSelectedCountry(country);
                    history.push(
                      `/news/country/${country}/category/${category}`
                    );
                  }}
                >
                  {country}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Form className="d-flex" onSubmit={onSubmit}>
              <FormControl
                type="search"
                placeholder="Search"
                className="search"
                aria-label="Search"
                onChange={({ target: { value } }) => setQuery(value)}
              />
              <Button
                className="search-btn"
                variant="outline-success"
                onClick={onSubmit}
              >
                Search
              </Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
