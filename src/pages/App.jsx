import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useApi } from "../hooks/useApi";
import NavBar from "../components/NavBar";
import NewsArticles from "./NewsArticles";

import env from "../environment";

const App = () => {
  const [search, setSearch] = useState();

  const updateSearch = (query) => setSearch(query);

  const [{ result, error }, getCountries] = useApi(
    "GET",
    `${env.API_BASE_URL}/countries`
  );

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  if (error) return <h4>{error}</h4>;

  const { data: countries = {} } = result;

  return (
    <div className="App">
      <Router basename={env.ROUTER_BASE_NAME}>
        <NavBar countries={countries} updateSearch={updateSearch} />
        <Switch>
          <Route
            path="/news/country/:country/category/:category"
            render={() => (
              <NewsArticles countries={countries} search={search} />
            )}
          />
          <Route
            path="/"
            component={() => (
              <Redirect
                to={`/news/country/${env.DEFAULT_COUNTRY}/category/general`}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
