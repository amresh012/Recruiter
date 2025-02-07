const asyncHandle = require("express-async-handler");
const nodemailer = require("nodemailer");
require("dotenv").config();
const sendEmail = asyncHandle(async (data) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ID, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
    maxMessages: Infinity, // Allow an unlimited number of messages per connection
    maxConnections: 5,
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.EMAIL_ID,
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.html, // html body
  });

  //

  //
});
module.exports = { sendEmail };
