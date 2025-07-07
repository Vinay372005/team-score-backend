import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

const sendSMS = async (to, body) => {
  try {
    await client.messages.create({
      body,
      from: twilioPhone,
      to,
    });
    console.log(`📤 SMS sent to ${to}`);
  } catch (error) {
    console.error(`❌ SMS failed to ${to}:`, error.message);
  }
};

export default sendSMS;
