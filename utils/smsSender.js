// utils/smsSender.js
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export const sendSMS = async (to, message) => {
  try {
    await client.messages.create({
      body: message,
      from: fromNumber,
      to: to.startsWith('+91') ? to : `+91${to}`
    });
    console.log(`✅ SMS sent to ${to}`);
  } catch (err) {
    console.error(`❌ Failed to send SMS to ${to}`, err.message);
  }
};

export const sendBulkSMS = async (numbers, message) => {
  for (const number of numbers) {
    await sendSMS(number, message);
  }
};
