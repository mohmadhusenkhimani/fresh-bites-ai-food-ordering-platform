const nodemailer = require("nodemailer");

const sendOrderEmail = async (to, subject, html) => {
  try {
    console.log("================================");
    console.log("TO:", to);
    console.log("SUBJECT:", subject);
    console.log("================================");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log("EMAIL SENT SUCCESSFULLY");
    console.log(info.messageId);

  } catch (error) {
    console.log("EMAIL ERROR");
    console.error(error);
  }
};

module.exports = sendOrderEmail;