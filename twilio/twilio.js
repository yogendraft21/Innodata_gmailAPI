const twilio = require("twilio");
require('dotenv').config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;

const client = twilio(accountSid, authToken);

async function makeCall(phoneNumber) {
    try {
    const call = await client.calls.create({
      twiml: "<Response><Say>Hello from your Twilio Account!</Say></Response>",
      to: phoneNumber,
      from: process.env.TWILIO_PHONE,
    });
    console.log("Call SID:", call.sid);
  } catch (error) {
    console.log("Error making call:", error);
  }
}

module.exports = makeCall;
