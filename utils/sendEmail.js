//node mailer for mailing service
const nodemailer = require("nodemailer");

//send mail function
const sendEmail = (options) => {

  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });

};
module.exports = sendEmail;
