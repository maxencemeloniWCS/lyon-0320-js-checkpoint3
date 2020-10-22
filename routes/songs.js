const express = require("express");
const router = express.Router();
const db = require("../database/mysql");

router.get("/", function (req, res) {
  res.send("Hello");
});

module.exports = router;
