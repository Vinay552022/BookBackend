const express = require('express');
const nodemailer = require("nodemailer");
const generateOTP = require("generate-otp");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mychatswebsite@gmail.com",
      pass: "hion jzxf rccd mchq",
    },
});

let otpMap = new Map(); 

module.exports.verifyOtp=(req, res) => {
  const { email, userEnteredOTP } = req.body;
  const storedOTP = otpMap.get(email);
  console.log(email,userEnteredOTP,storedOTP)
  if (!storedOTP) {
    return res.status(404).json({ message: "OTP not found for the user" });
  }
  if (userEnteredOTP === storedOTP) {
    return res.status(200).json({ message: "OTP verification successful" });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
};
// API endpoint to send OTP via email
module.exports.sendOtp=(req, res) => {
  const email = req.body.email; // Access email from request body
  const otp = generateOTP.generate(6, {
    upperCase: false,
    specialChars: false,
  });
  otpMap.set(email, otp);
  console.log("emailssssss" + email);
  const mailOptions = {
    from: "Booknodemailer", // Change the 'from' email to your own email
    to: email,
    subject: "Verification OTP",
    html: `
      <html>
        <head>
          <style>
            /* Your CSS styles go here */
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Verification OTP</h1>
            <p>Your OTP for email verification is: ${otp}</p>
          </div>
        </body>
      </html>
    `
  };
  

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Failed to send OTP");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("OTP sent successfully");
    }
  });
};