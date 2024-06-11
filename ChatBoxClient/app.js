const http = require("http");
const express = require("express");

var app = express();
app.use("/public", express.static(__dirname + "/public"));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/chat.html");
});

app.listen("3036", function() {
  console.log(
    "Server started 3036 " + +" at " + new Date().toLocaleString().substr(0, 24)
  );
});
