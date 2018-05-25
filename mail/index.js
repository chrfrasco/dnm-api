const nodemailer = require("nodemailer");

module.exports.init = async () =>
  nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

module.exports.createMessage = ({ name, text, html, files }) => ({
  from: `${name} <${process.env.GMAIL_USER}>`,
  to: `Applications Manager <${process.env.RECIPIENT}>`,
  subject: `New Application from ${name}`,
  attachments: files.map(file => ({
    content: file.buffer,
    filename: file.originalname
  })),
  text,
  html
});

module.exports.sendMail = (transporter, message) =>
  new Promise((resolve, reject) =>
    transporter.sendMail(message, (err, info) => {
      if (err) {
        reject(err);
      }

      resolve(info);
    })
  );
