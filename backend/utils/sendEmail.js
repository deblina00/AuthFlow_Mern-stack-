// const nodemailer = require("nodemailer");

// const sendEmail = async (email, subject, text) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject,
//     text,
//   });
// };

// module.exports = sendEmail;


const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, textData, htmlTemplate = null) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let html = null;

  if (htmlTemplate) {
    const templatePath = path.join(__dirname, "../emails", htmlTemplate);
    html = fs.readFileSync(templatePath, "utf-8");

    Object.keys(textData).forEach((key) => {
      html = html.replace(new RegExp(`{{${key}}}`, "g"), textData[key]);
    });
  }

  await transporter.sendMail({
    from: `"Your App Name" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    text: textData.otp ? `Your OTP is ${textData.otp}` : subject,
    html,
  });
};

module.exports = sendEmail;
