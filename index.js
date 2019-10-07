/**
 * @Author: ankit
 * @Date:   2018-11-25T03:45:52+05:30
 * @Email:  ankit@minance.com
 * @Last modified by:   ankit
 * @Last modified time: 2019-08-01T18:28:39+05:30
 * @Copyright: Minance Technologies Private Limited
 */

var express = require("express");
var mysql = require("mysql");
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Akt@1992",
  database: "test"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

app.get("/login", function(req, res) {
  console.log(req.body.user_name, req.body.pass);
  var sql_query =
    "SELECT user_name, password FROM Persons WHERE user_name = ? AND password = ?";
  var inserts = [req.body.user_name, req.body.pass];
  sql_query = mysql.format(sql_query, inserts);
  connection.query(sql_query, function(error, results) {
    if (results.length !== 0) {
      return res.send({ status: "Success" });
    } else {
      return res.status(400).send({ status: "Failed" });
    }
  });
});

app.post("/register", function(req, res) {
  // console.log(req.body);
  var sql_query = "INSERT INTO Persons VALUES (?, ?, ?, ?, ?)";
  var inserts = [
    req.body.user_id,
    req.body.first_name,
    req.body.last_name,
    req.body.user_name,
    req.body.password
  ];
  query = mysql.format(sql_query, inserts);
  connection.query(query, function(error, results) {
    if (results.length !== 0) {
      return res.send(JSON.stringify({ status: "Success" }));
    } else {
      return res.send(JSON.stringify({ status: "Failed" }));
    }
    // console.log(error, "Error");
    // console.log(results, "Results");
  });
});

app.listen(5000, function() {
  console.log("Example app listening on port 5000!");
});
