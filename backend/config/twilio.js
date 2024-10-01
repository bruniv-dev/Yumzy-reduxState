import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendWelcomeSMS = async (to, name) => {
  const message = `Hello ${name}, welcome to our service!`;

  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    });
    console.log("Welcome SMS sent to: " + to);
  } catch (error) {
    console.error("Error sending SMS: ", error);
  }
};

export const sendOrderConfirmationSMS = async (to, orderId) => {
  const message = `Your order with ID ${orderId} has been placed successfully. Thank you for choosing Yumzy!`;

  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    });
    console.log("Order confirmation SMS sent to: " + to);
  } catch (error) {
    console.error("Error sending SMS: ", error);
  }
};
