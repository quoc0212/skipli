import twilio from "twilio";
import * as dotenv from "dotenv";
import writeDatabase from "./write_database.js";
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_FROM_NUMBER;
const toNumber = process.env.TWILIO_TO_NUMBER;

const client = twilio(accountSid, authToken);

export default function createNewAccessCode(database, phoneNumber) {
  const accessCode = generateAccessCode();
  sendAccessCodeSMS(fromNumber, toNumber, accessCode);
  writeDatabase.writeUserPhoneNumber(database, phoneNumber, accessCode);
  return accessCode;
}

function generateAccessCode() {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  return code;
}

function sendAccessCodeSMS(from, to, body) {
  return client.messages
    .create({
      from,
      to,
      body,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));
}
