const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.CONFIG_MAILER_HOST,
  port: process.env.CONFIG_MAILER_PORT,
  secure: false,
  auth: { 
    user: process.env.CONFIG_MAILER_USER, 
    pass: process.env.CONFIG_MAILER_PASS 
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;