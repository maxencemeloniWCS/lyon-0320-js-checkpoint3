const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { check, validationResult } = require("express-validator");

router.get("/", (req, res) => {
  db.query("SELECT * FROM user", (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        sql: err.sql,
      });
    } else {
      res.status(200).json(results);
    }
  });
});

const userValidationMiddlewares = [
  check("email").isEmail(),
  check("password").isLength({ min: 8 }),
  check("first_name").isLength({ min: 2 }),
  check("last_name").isLength({ min: 2 }),
];

router.post("/", userValidationMiddlewares, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return db.query("INSERT INTO user SET ?", req.body, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql,
      });
    }
    return db.query(
      "SELECT * FROM user WHERE id = ?",
      results.insertId,
      (err2, records) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });
        }
        const insertedUser = records[0];
        const { password, ...user } = insertedUser;
        const host = req.get("host");
        const location = `http://${host}${req.url}/${user.id}`;
        return res.status(201).set("Location", location).json(user);
      }
    );
  });
});

router.get("/:id/my-added-playlists", (req, res) => {
  let userId = req.params.id;
  db.query(
    "SELECT * FROM playlist WHERE owner_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        res.status(500).json({
          error: err.message,
          sql: err.sql,
        });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

module.exports = router;
