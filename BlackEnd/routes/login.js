const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
const fs = require("fs");
const jwt = require("jsonwebtoken");
const db = require("../config/database");
const { getToken, verifyToken } = require("../config/authorize");

router.route("/regis").post((req, res, next) => {
  console.log("xxxs");
  const username = req.body.UserID;
  const password = req.body.Password;
  const name = req.body.name;
  const role = req.body.role;

  console.log(username, "x", password, "x", role);
  bcrypt.hash(password, SALT_WORK_FACTOR, function (err, hash) {
    var sql = "INSERT INTO user (username,password,name,role) VALUES ?";
    var values = [[username, hash, name, role]];
    console.log(values);
    db.query(sql, [values], (error, results, fields) => {
      if (error)
        return res.status(500).json({
          status: 500,
          message: "Internal Server Error",
        });
      const result = {
        status: 200,
      };
      return res.json(result);
    });
    console.log(hash);
  });
});

router.route("/login").post((req, res, next) => {
  let username = req.body.user;
  let password = req.body.pass;
  console.log(username, "-", password);
  let sql = "SELECT password FROM user WHERE username = ?";
  db.query(sql, [username], (error, results, fields) => {
    if (error)
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    if (results.length > 0) {
      const hash = results[0];
      console.log(hash.password);
      bcrypt.compare(password, hash.password, function (err, result) {
        if (result == true) {
          var sql = "SELECT name, role FROM user WHERE username = ?";
          db.query(sql, [username], (error, results, fields) => {
            if (error)
              return res.status(500).json({
                status: 500,
                message: "Internal Server Error",
              });            
            var token = getToken({ name:results[0].name, role:results[0].role });
            const result = {
              status: 200,
              data: token,
            };
            return res.json(result);
          });
        }
        console.log(result);
      });
    } else {
      const result = {
        status: "false",
        data: "",
      };
      return res.json(result);
    }
  });
});
router.route("/home")
.post(verifyToken, (req, res, next) => {
  
    return res.json(req.role);
  });

router.route("/table")
.post(verifyToken, (req, res, next) => {
    var sql = "SELECT @row:=@row+1 AS `row`, name  FROM tables , (SELECT @row:=0) AS r";
  db.query(sql, (error, results, fields) => {
    if (error){
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
    const result = {
      "status": 200,
      "data": results
    };
    return res.json(result);
  });
});

router.route("/edittable")
.post(verifyToken, (req, res, next) => {
  let List = req.body.List
  if(req.role == 1){
  var sql = "INSERT INTO tables (name) VALUES ?";
  var values = [[List]];
  db.query(sql, [values], (error, results, fields) => {
    if (error){
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
    const result = {
      status: 200,
    };
    return res.json(result);
  });
}
});

module.exports = router;
