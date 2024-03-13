const axios = require("axios");
const { createConfig } = require("./utils");
const nodemailer = require("nodemailer");
const CONSTANTS = require("./constant");
const { google } = require("googleapis");
const makeCall = require("./twilio");

require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const notificationInfo = {
  // email: "DWSAdmin-noreply@innodata.com",
  email: "YOGENDRA SINGH <yogendra311204@gmail.com>",
  subject: "Work link",
  phoneNumber: "+916375422034",
};


async function getMails(req, res) {
  try {
    const { token } = await oAuth2Client.getAccessToken();
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/threads?maxResults=5&labelIds=UNREAD`;
    const config = createConfig(url, token);
    const response = await axios(config);

    const threads = response.data.threads || []; // Ensure threads is an array or default to empty array
    const formattedThreads = await processThreads(
      threads,
      req.params.email,
      token
    );

    res.json(formattedThreads);
  } catch (error) {
    console.log(error);
    res
      .status(error.response?.status || 500)
      .send(error.response?.statusText || "Internal Server Error");
  }
}


async function processThreads(threads, email, token) {
  const formattedThreads = [];
  let foundWorkLink = false;

  for (const thread of threads) {
    const messages = await getThreadMessages(thread.id, email, token);
    for (const message of messages) {
      const { sender, subject } = getMessageDetails(message);

      if (sender === notificationInfo.email) {
        const formattedMessage = {
          id: message.id,
          snippet: message.snippet,
          historyId: message.historyId,
          sender,
          subject,
        };

        formattedThreads.push(formattedMessage);

        if (subject.includes(notificationInfo.subject)) {
          foundWorkLink = true;
          makeCall(notificationInfo.phoneNumber);
          break;
        }
      }
    }

    if (foundWorkLink) {
      break;
    }
  }

  return formattedThreads;
}

async function getThreadMessages(threadId, email, token) {
  const messageUrl = `https://gmail.googleapis.com/gmail/v1/users/${email}/threads/${threadId}`;
  const messageConfig = createConfig(messageUrl, token);
  const messageResponse = await axios(messageConfig);
  return messageResponse.data.messages;
}

function getMessageDetails(message) {
  const sender = message.payload.headers.find(
    (header) => header.name === "From"
  ).value;
  const subject = message.payload.headers.find(
    (header) => header.name === "Subject"
  ).value;

  return { sender, subject };
}


module.exports = {
  getMails,
};
