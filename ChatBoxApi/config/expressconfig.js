require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const consign = require("consign");
const bodyParser = require("body-parser");
const jwt = require("../middlewares/jwt");
//const requestModifier = require("../middlewares/requestModifier");
const errorHandler = require("../middlewares/error-handler");

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false
  })
);
app.use(bodyParser.json({ limit: "50mb" }));

app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use(morgan("dev"));

consign()
  .include("./routes")
  .into(app);

// global error handler
app.use(errorHandler);

module.exports = function() {
  return app;
};
