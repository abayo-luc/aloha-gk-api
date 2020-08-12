const dotenv = require("dotenv");
dotenv.config();
const { DB_NAME, DB_PASSWORD } = process.env;
module.exports = {
  development: {
    use_env_variable: "DATABASE_URL",
  },
  test: {
    use_env_variable: "DATABASE_URL_TEST",
  },
  production: {
    use_env_variable: "DATABASE_URL",
  },
};
