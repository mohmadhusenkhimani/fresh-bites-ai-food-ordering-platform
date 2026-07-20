const nodemailer = require("nodemailer");

const sendResetPasswordEmail = async (
  to,
  fullName,
  resetLink
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Fresh Bites" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Reset Your Fresh Bites Password",

    // Plain Text
    text: `
Hello ${fullName},

We received a request to reset your Fresh Bites account password.

Click the link below to reset your password:

${resetLink}

This password reset link will expire in 15 minutes.

If you did not request this, you can safely ignore this email.

Fresh Bites Team
`,

    // HTML
    html: `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px;">

        <h2>Hello ${fullName},</h2>

        <p>
          We received a request to reset your
          <strong>Fresh Bites</strong> account password.
        </p>

        <p>
          Click the button below to create a new password.
        </p>

        <div style="margin:30px 0; text-align:center;">
          <a
            href="${resetLink}"
            style="
              background:#dc2626;
              color:#ffffff;
              text-decoration:none;
              padding:12px 24px;
              border-radius:6px;
              display:inline-block;
              font-weight:bold;
            "
          >
            Reset Password
          </a>
        </div>

        <p>
          This link will expire in
          <strong>15 minutes</strong>.
        </p>

        <p>
          If you didn't request a password reset,
          you can safely ignore this email.
        </p>

        <br>

        <p>Regards,</p>

        <h3>Fresh Bites Team ❤️</h3>

      </div>
    `,
  });

  console.log("Reset password email sent:", info.response);
  console.log("Reset password link:", resetLink);
};

module.exports = sendResetPasswordEmail;