require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const errorHandler = require("../middlewares/error-handler");

const url = require("url");
var _ = require("underscore");
const minify = require("@node-minify/core");
//const gcc = require('@node-minify/google-closure-compiler')
const uglifyjs = require("@node-minify/uglify-js");
const cleanCSS = require("@node-minify/clean-css");
var apiProxy = require("http-proxy-middleware");
var chatService = require("../services/chat.service");

async function doMinify() {
  await minify({
    compressor: uglifyjs,
    input: "./chatPlugin.js",
    output: "./public/livechat.min.js"
  });
  await minify({
    compressor: cleanCSS,
    input: "./public/css/main.css",
    output: "./public/livechat.min.css"
  });
}
try {
 // doMinify();
} catch (ex) {
  // DO Nothing
}

// proxy middleware options
var options = {
  target: process.env.API_URI, // target host
  changeOrigin: true,
  async onProxyReq(proxyReq, req, res) {
    if (req.method == "POST" && req.originalUrl.includes("api/login")) {
      if (
        req.query != null &&
        req.query.staffId != null &&
        req.query.sourcePortal == "AGENT"
      ) {
        var staffId = req.query.staffId.toLowerCase();

        if (global[staffId]) {
          return res
            .set("Access-Control-Allow-Origin", "*")
            .status(400)
            .json({ message: "Agent Session Active from session!!!" });
        }
        global[staffId] = staffId;
        // global.sessionCheckingList.push(req.query.staffId.toLowerCase());

        var isAgentLoggedIn = await chatService.isAgentLoggedIn(
          req.query.staffId,
          { isStaffId: true }
        );
        if (isAgentLoggedIn) {
          //setTimeout(function () { global.sessionCheckingList = _.reject(sessionCheckingList, x => x == req.query.staffId.toLowerCase()) }, 100);
          setTimeout(function() {
            delete global[staffId];
          }, 300);
          return res
            .set("Access-Control-Allow-Origin", "*")
            .status(400)
            .json({ message: "Agent Session Active!!!" });
        } else
          setTimeout(function() {
            delete global[staffId];
          }, 300);
        //setTimeout(function () { global.sessionCheckingList = _.reject(sessionCheckingList, x => x == req.query.staffId.toLowerCase()) }, 100);
      }
    }
  }
};

// create the proxy (without context)
var apiProxyInstance = apiProxy(options);

app.use("/api", apiProxyInstance);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false
  })
);
app.use(bodyParser.json({ limit: "50mb" }));

app.use(cors());

// use JWT auth to secure the api
//app.use(jwt());

// api routes
app.use(morgan("dev"));

// global error handler
app.use(errorHandler);
// New hostname+path as specified by question:
// const apiProxy = proxy(config.env.API_URI, {
//   forwardPath: req => url.parse(req.baseUrl).path,
// }
// );

// app.use("/api/*", apiProxy);

module.exports = function() {
  return app;
};
