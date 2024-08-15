//use for mail send mailtrap service
const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailService {
  static async sendEmail(to, subject, htmlContent) {
    let transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER, // Mailtrap user
        pass: process.env.MAILTRAP_PASS  // Mailtrap password
      }
    });

    let mailOptions = {
      from: `"Virtual Event Platform" <no-reply@virtualevent.com>`, // From email address
      to,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
  }
}

module.exports = EmailService;
