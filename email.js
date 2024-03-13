const nodemailer = require("nodemailer");
const express = require ("express");

const app = express();

const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: 'praisdania@gmail.com',
      pass: 'qqbqojgnvjzfqtji'
   }
  });
  
  const message = {
      from:"praisdania@gmail.com" , 
      to: "kennedymarvellous001@gmail.com",
      subject: "testing",
      text: "successfully sent"};
 
      transporter.sendMail(message,function(error, result){
       if(err){console.log(error)}
         else{console.log(result)}
       }
      );

    
