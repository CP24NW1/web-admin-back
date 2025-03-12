import nodemailer from "nodemailer";
import crypto from "crypto";

//-------------------
// UTILS
//-------------------

export const generateVerificationCode = () => {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
};

//-------------------
// VERIFY EMAIL
//-------------------

export const sendVerificationEmail = async (email, verificationCode) => {
  const encode = await encodeURIComponent(email);
  const url = `${process.env.FRONTEND_HOST_URL}/admin/verify-email?email=${encode}`;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: {
        name: "CP24NW1 NOTIFICATION: VERIFY YOUR EMAIL",
        address: process.env.AUTH_EMAIL,
      },
      to: email,
      subject: "Email Verification",
      html: `<p>Your verification code is: <strong>${verificationCode}</strong></p><br>
            <b>Please verify your email and set your password <a href=${url}>here</a></b>`,
    };

    // ส่งอีเมล
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    return info; // คืนค่าเมื่อส่งอีเมลสำเร็จ
  } catch (err) {
    console.log("Error sending email:", err);
    throw new Error("Failed to send verification email");
  }
};

//-------------------
// SET PASSWORD
//-------------------

export const sendSetPasswordEmail = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: {
        name: "CP24NW1 NOTIFICATION: SET YOUR PASSWORD",
        address: process.env.AUTH_EMAIL,
      },
      to: email,
      subject: "Email Verification",
      html: `<p>กรุณาคลิกที่ลิงค์เพื่อดำเนินการตั้งรหัสผ่าน: <a href="https://www.google.com">ตั้งรหัสผ่าน</a></p>`,
    };

    // ส่งอีเมล
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    return info; // คืนค่าเมื่อส่งอีเมลสำเร็จ
  } catch (err) {
    console.log("Error sending email:", err);
    throw new Error("Failed to send verification email");
  }
};
