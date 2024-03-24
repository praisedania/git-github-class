/********************IMPORTS********************/

const express = require("express");
const bodyparser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");


/********************FUNCTIONS********************/
const app = express();

app.use(cors({ origin: "*" }));

const con = mysql.createPool({
  host: "srv1107.hstgr.io",
  user: "u532672005_praise",
  password: "PraiseDania12344",
  database: "u532672005_praiseBE",
  port: "3306",
});

/********************ENDPOINTS ********************/

app.post("/signup", bodyparser.json(), function (req, res) {
  var sql = `INSERT INTO users(firstname,lastname,DateOfBirth,email,pass)
    VALUES('${req.body.firstname}','${req.body.lastname}','${req.body.DateOfBirth}','${req.body.email}',
    '${req.body.pass}'
    )`;
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


app.post("/posts", bodyparser.json(), function (req, res) {
  const { id, content } = req.body;
  var sql = `INSERT INTO posts(users_id,content)
    VALUES('${id}','${content}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

 app.post("/posts/:postid/likes", bodyparser.json(), function (req, res) {
   const { post_id, } = req.params;
  const { user_id, } = req.body;
  var sql = `INSERT INTO post_likes(post_id,users_id)
     VALUES('${post_id}','${user_id}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
 });


app.post("/posts/:postid/comments", bodyparser.json(), function (req, res) {
  const { post_id, } = req.params;
  const { users_id, comment_text } = req.body;
  var sql = `INSERT INTO post_comments(post_id,users_id)
    VALUES('${post_id}','${users_id}','${comment_text})`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});


app.post("/chats", bodyparser.json(), function (req, res) {
  var sql = `INSERT INTO ChatMessages(sender_id,recipient_id,message)
    VALUES('${req.body.sender_id}','${req.body.recipient_id}','${req.body.message}'
    )`;
  con.query(sql,function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});




app.listen(4000, console.log("listening 4000"));
