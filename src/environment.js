const common = {};

const env = {
  dev: {
    ROUTER_BASE_NAME: "/",
    API_BASE_URL: "http://localhost:3000",
    DEFAULT_COUNTRY: "United Kingdom",
  },
};

const environment = {
  ...common,
  ...env[process.env.REACT_APP_STAGE],
};

export default environment;
