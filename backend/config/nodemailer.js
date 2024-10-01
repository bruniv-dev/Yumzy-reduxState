import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Logging the email credentials (remove in production)
console.log("Email:", process.env.EMAIL_USER);
console.log("Password:", process.env.EMAIL_PASS);

export const sendWelcomeEmail = async (to, name) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Yumzy: Welcome to Our Service!",
    html: `
      <div style="text-align: center;">
        <h1>Welcome to Yumzy, ${name}!</h1>
        <p>Thank you for registering with us!</p>
        <p>Happy Eating,<br>Yumzy</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent to: " + to);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

export const sendOrderConfirmationEmail = async (to, name, orderId) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Yumzy:  Order Confirmation",
    html: `
      <div style="text-align: center;">
        <h1>Order Confirmation</h1>
        <p>Dear ${name},</p>
        <p>Thank you for your order! Your order ID is <strong>${orderId}</strong>.</p>
        <p>We are preparing your food and will notify you once it’s on the way!</p>
        <p>Happy Eating,<br>Yumzy</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Order confirmation email sent to: " + to);
  } catch (error) {
    console.error("Error sending order confirmation email: ", error);
  }
};
