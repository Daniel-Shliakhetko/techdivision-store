const config = require("config");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = config.get("port");

app.listen(PORT, () => {
  console.log("Listening ", PORT);
});
