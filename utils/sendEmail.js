const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const Token = require("../models/tokenModel");
require("dotenv").config();
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

module.exports = async (user, mailType) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        user: adminEmail.toString(),
        pass: adminPassword.toString()
      },
    });

    const encryptedToken = bcrypt
      .hashSync(user._id.toString(), 10)
      .replace(/["/"]/g, "");
    const token = new Token({
      userid: user._id,
      token: encryptedToken,
    });
    await token.save();

    let emailContent, mailOptions;
    if (mailType == "verifyemail") {
      emailContent = `<div><h3>Please click on the below link to verify your email address</h3> 
      <a href="http://localhost:3000/verifyemail/${encryptedToken}">${encryptedToken}</a>  </div>`;

      mailOptions = {
        from: adminEmail.toString(),
        to: user.email,
        subject: "Verify Email For MERN Auth",
        html: emailContent,
      };
    } else {
      emailContent = `<div><h1>Please click on the below link to reset your password</h1> <a href="http://localhost:3000/resetpassword/${encryptedToken}">${encryptedToken}</a>  </div>`;

      mailOptions = {
        from: "sheylearnings@gmail.com",
        to: user.email,
        subject: "Reset password For MERN Auth",
        html: emailContent,
      };
    }

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};