export const sendEmail = async (recipientEmail, subject, HTMLBody) => {
  // สร้างการเชื่อมต่อกับบริการอีเมล (ตัวอย่างการใช้ Gmail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yourEmail@gmail.com", // อีเมลที่ใช้ส่ง
      pass: "yourEmailPassword", // รหัสผ่านของอีเมล
    },
  });

  const mailOptions = {
    from: "yourEmail@gmail.com", // อีเมลที่ใช้ส่ง
    to: recipientEmail, // อีเมลที่รับ
    subject: subject, // หัวข้อของอีเมล
    html: `${HTMLBody}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
