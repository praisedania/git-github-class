/********************IMPORT ********************/

const express = require("express");
const bodyparser = require("body-parser");
const mysql = require("mysql2");
const multer = require("multer");
const cors = require("cors");
const nodemailer = require("nodemailer");


/********************FUNCTION********************/
const app = express();


app.use(cors({origin:"*"}));
const con = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Sweetlove",
  database: "learning",
  port: "3306",
});
const upload = multer({
  dest: "./upload/images",
})
const test = "john"
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'praisdania@gmail.com',
    pass: 'qqbqojgnvjzfqtji'
  }
});

function mailOptionCred(from, to, subject, body) {
  const message = {
    from,
    to,
    subject,
    body
  };

  return message;

}

const myMessage = mailOptionCred("praisdania@gmail.com", "developerjohnpaul@gmail.com", "testing", "new mail from")


/********************ENDPOINT ********************/

app.post("/signup", bodyparser.json(), function (req, res) {
  var sql = `INSERT INTO users(firstname,lastname,email,pass,gender)
  VALUES('${req.body.firstname}','${req.body.lastname}','${req.body.email}','${req.body.pass}',
  '${req.body.gender}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.get("/test", bodyparser.json(), function (req, res) {


    res.send("yes");

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

app.post("/mailDelivery", bodyparser.json(), function (req, res) {
  const { from, to, subject, body } = req.body
  const message = {
    from,
    to,
    subject,
    body
  };
  transporter.sendMail(message, function (error, result) {
    if (error) { console.log(error) }
    else { console.log(result) }
  }
  );
});



app.listen(8000, console.log("listening 8000"));