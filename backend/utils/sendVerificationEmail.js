// const nodemailer = require("nodemailer");

// const sendVerificationEmail = async (to, fullName, verificationLink) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const info = await transporter.sendMail({
//     from: `"Fresh Bites" <${process.env.EMAIL_USER}>`,
//     to,
//     subject: "Verify Your Fresh Bites Account ✅",
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px;">
//         <h2>Hello ${fullName},</h2>

//         <p>Thank you for signing up for <strong>Fresh Bites</strong>.</p>

//         <p>Please verify your email address by clicking the button below:</p>

//         <div style="margin:30px 0; text-align:center;">
//           <a
//             href="${verificationLink}"
//             style="
//               background:#dc2626;
//               color:#ffffff;
//               text-decoration:none;
//               padding:12px 24px;
//               border-radius:6px;
//               display:inline-block;
//               font-weight:bold;
//             "
//           >
//             Verify Email
//           </a>
//         </div>

//         <p>This verification link will expire in <strong>24 hours</strong>.</p>

//         <p>If you didn't create this account, you can safely ignore this email.</p>

//         <br>

//         <p>Regards,</p>
//         <h3>Fresh Bites Team ❤️</h3>
//       </div>
//     `,
//   });
//   console.log("Verification email sent:", info.response);
// };

// module.exports = sendVerificationEmail;

const nodemailer = require("nodemailer");

const sendVerificationEmail = async (
  to,
  fullName,
  verificationLink
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
    subject: "Please verify your Fresh Bites account",

    // Plain text version (helps reduce spam)
    text: `
Hello ${fullName},

Thank you for signing up for Fresh Bites.

Please verify your account using the link below:

${verificationLink}

This verification link expires in 24 hours.

If you didn't create this account, you can ignore this email.

Fresh Bites Team
`,

    // HTML version
    html: `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px;">
        
        <h2>Hello ${fullName},</h2>

        <p>
          Thank you for signing up for
          <strong>Fresh Bites</strong>.
        </p>

        <p>
          Please verify your email address by clicking the button below:
        </p>

        <div style="margin:30px 0; text-align:center;">
          <a
            href="${verificationLink}"
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
            Verify Email
          </a>
        </div>

        <p>
          This verification link will expire in
          <strong>24 hours</strong>.
        </p>

        <p>
          If you didn't create this account, you can safely ignore this email.
        </p>

        <br>

        <p>Regards,</p>

        <h3>Fresh Bites Team ❤️</h3>
      </div>
    `,
  });

  console.log("Verification email sent:", info.response);
  console.log("Verification link:", verificationLink);
};

module.exports = sendVerificationEmail;