const nodemailer = require("nodemailer");

module.exports.init = () =>
  new Promise((resolve, reject) =>
    nodemailer.createTestAccount((err, account) => {
      if (err) {
        reject(err);
      }

      resolve(
        nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass
          }
        })
      );
    })
  );

module.exports.createMessage = ({ name, text, html, files }) => ({
  from: `${name} <sender@example.com>`,
  to: "Applications Manager <recipient@example.com>",
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
      resolve(nodemailer.getTestMessageUrl(info));
    })
  );
