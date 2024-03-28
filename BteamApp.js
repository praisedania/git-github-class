/********************IMPORTS********************/

const express = require("express");
const bodyparser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const nodemailer = require("nodemailer");


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

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'praisdania@gmail.com',
    pass: 'qqbqojgnvjzfqtji'
  }
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 500000);
}

/********************ENDPOINTS *******************/

app.post("/sendOtp", bodyparser.json(), function (req, res) {
  const { from, to, subject, text, } = req.body
  const otp =generateOTP()
  const message = {
    from,
    to,
    subject,
    text,
  };
  transporter.sendMail(message, function (error, result) {
    if (error) { console.log(error) }
    else { console.log(result,otp) }
  }
  );
});



app.post("/signup", bodyparser.json(), function (req, res) {
  var sql = `INSERT INTO users(firstname,lastname,DateOfbirth,email,pass,)
  VALUES('${req.body.firstname}','${req.body.lastname}','${req.body.DateOfBirth}','${req.body.email}',
  '${req.body.pass}')`;
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
    WHERE user_id = '${req.params.user_id}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});


app.post("/posts", bodyparser.json(), function (req, res) {
  var sql = `INSERT INTO posts(user_id,content)
    VALUES('${req.body.user_id}','${req.body.content}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/posts", bodyparser.json(), function (req, res) {
  var sql = `SELECT 
  posts.*, 
  COUNT(comments.comment_id) AS comment_count, 
  COUNT(likes.like_id) AS like_count
FROM posts
LEFT JOIN comments ON posts.post_id = comments.post_id
LEFT JOIN likes ON posts.post_id = likes.post_id
GROUP BY posts.post_id; `;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/likes", bodyparser.json(), function (req, res) {
  var sql = `INSERT INTO likes(user_id)
     VALUES('${req.body.user_id}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/alllikes", bodyparser.json(), function (req, res) {
  var sql = `SELECT * FROM likes
    WHERE post_id = '${req.body.post_id}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.delete("/deletelikes", bodyparser.json(), function (req, res) {
  var sql = `DELETE FROM likes
  WHERE user_id = '${req.body.user_id}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/comments", bodyparser.json(), function (req, res) {
  var sql = `INSERT INTO comments(user_id,content)
    VALUES('${req.body.user_id}','${req.body.content}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/allComments", bodyparser.json(), function (req, res) {
  var sql = `SELECT * FROM comments
    WHERE post_id = '${req.body.post_id}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.delete("/deletecomments", bodyparser.json(), function (req, res) {
  var sql = `DELETE FROM comments
  WHERE user_id = '${req.body.user_id}' AND content = '${req.body.content}'`

  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});


app.post("/chats", bodyparser.json(), function (req, res) {
  var sql = `INSERT INTO chats(sender_id,reciever_id,message,time_stamp)
    VALUES('${req.body.sender_id}','${req.body.reciever_id}','${req.body.message}',
    '${req.body.time_stamp}'
    )`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/chats", bodyparser.json(), function (req, res) {
  var sql = `SELECT*FROM chats WHERE 
    sender_id='${req.body.sender_id}' `
  con.query(sql, function (err, result) {
    if (err) throw err;


    res.send(result);
  });
});



app.listen(4000, console.log("listening 4000"));
