import _ from "lodash";
import nodemailer from "nodemailer";

var config = {
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "caidapplication@gmail.com",
    pass: "...+caidlj+...",
  },
  // tls: {
  //   rejectUnauthorized: true,
  // },
};

var transporter = nodemailer.createTransport(config);

var defaultMail = {
  from: "no-reply <caidapplication@gmail.com>",
};

module.exports = function (mail) {
  // use default setting
  mail = _.merge({}, defaultMail, mail);
  // send email
  transporter.sendMail(mail, function (error, info) {
    if (error) return console.log(error);
    console.log("mail sent:", info.response);
  });
};
