const express = require("express");
const bodyparser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const con = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Sweetlove",
  database: "learning",
  port: "3306",
});
app.post("/signup", bodyparser.json(), function (req, res) {
  var sql = `INSERT INTO users(firstname,lastname,email,pass,gender)
  VALUES('${req.body.firstname}','${req.body.lastname}','${req.body.email}','${req.body.pass}',
  '${req.body.gender}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/login", bodyparser.json(), function (req, res) {
  var sql = `SELECT * FROM users
    WHERE email='${req.body.email}' AND pass='${req.body.pass}'`; 
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/getUser/:id", bodyparser.json(), function (req, res) {
  var sql = `SELECT * FROM users
    WHERE id = '${req.params.id}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(8000, console.log("listening 8000"));