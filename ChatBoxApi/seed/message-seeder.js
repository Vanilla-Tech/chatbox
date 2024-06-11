require("custom-env").env(true, process.cwd() + "//");
const DefaultMessage = require("../models/defaultMessage");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useCreateIndex: true,
  useNewUrlParser: true
});

const messages = [
  {
    type: "WELCOME",
    message: "Hi {0}, how can we help you today?",
    channelCode: "WEB"
  },
  {
    type: "WELCOME",
    message: "Hi {0}, how can we help you today?",
    channelCode: "PORTAL"
  },
  {
    type: "WELCOME",
    message: "Hi {0}, how can we help you today?",
    channelCode: "APP"
  },
  {
    type: "START_TIME",
    message: "Started {0} on {1}",
    channelCode: "WEB"
  },
  {
    type: "START_TIME",
    message: "Started {0} on {1}",
    channelCode: "PORTAL"
  },
  {
    type: "START_TIME",
    message: "Started {0} on {1}",
    channelCode: "APP"
  },
  {
    type: "AGENT_BUSY",
    message:
      "Our agents are currently engaged, they will be with you shortly. Thank you for your patience.",
    channelCode: "WEB"
  },
  {
    type: "AGENT_BUSY",
    message:
      "Our agents are currently engaged, they will be with you shortly. Thank you for your patience.",
    channelCode: "PORTAL"
  },
  {
    type: "AGENT_BUSY",
    message:
      "Our agents are currently engaged, they will be with you shortly. Thank you for your patience.",
    channelCode: "APP"
  },
  {
    type: "USER_CLOSE_CHAT",
    message: "User has ended the chat",
    channelCode: "WEB"
  },
  {
    type: "USER_CLOSE_CHAT",
    message: "User has ended the chat",
    channelCode: "APP"
  },
  {
    type: "USER_CLOSE_CHAT",
    message: "User has ended the chat",
    channelCode: "PORTAL"
  },
  {
    type: "AGENT_CLOSE_CHAT",
    message: "Agent has ended the chat",
    channelCode: "WEB"
  },
  {
    type: "AGENT_CLOSE_CHAT",
    message: "Agent has ended the chat",
    channelCode: "PORTAL"
  },
  {
    type: "AGENT_CLOSE_CHAT",
    message: "Agent has ended the chat",
    channelCode: "APP"
  },
  {
    type: "CHAT_IDEAL",
    message: "Chat has ended due to 15 mins of inactivity",
    channelCode: "WEB"
  },
  {
    type: "CHAT_IDEAL",
    message: "Chat has ended due to 15 mins of inactivity",
    channelCode: "PORTAL"
  },
  {
    type: "CHAT_IDEAL",
    message: "Chat has ended due to 15 mins of inactivity",
    channelCode: "APP"
  },
  {
    type: "TIMEOUT",
    message: "Chat has ended, session timed out",
    channelCode: "WEB"
  },
  {
    type: "TIMEOUT",
    message: "Chat has ended, session timed out",
    channelCode: "PORTAL"
  },
  {
    type: "TIMEOUT",
    message: "Chat has ended, session timed out",
    channelCode: "APP"
  },
  {
    type: "CHAT_DONE",
    message: "Chat has been marked as Done",
    channelCode: "WEB"
  },
  {
    type: "CHAT_DONE",
    message: "Chat has been marked as Done",
    channelCode: "PORTAL"
  },
  {
    type: "CHAT_DONE",
    message: "Chat has been marked as Done",
    channelCode: "APP"
  },
  {
    type: "CHAT_TRANSFER",
    message: "Chat has been transferred ",
    channelCode: "WEB"
  },
  {
    type: "CHAT_TRANSFER",
    message: "Chat has been transferred ",
    channelCode: "PORTAL"
  },
  {
    type: "CHAT_TRANSFER",
    message: "Chat has been transferred ",
    channelCode: "APP"
  },
  {
    type: "CHAT_QUEUE",
    message:
      "You are currently number {0} in queue. Thank you for your patience.",
    channelCode: "WEB"
  },
  {
    type: "CHAT_QUEUE",
    message:
      "You are currently number {0} in queue. Thank you for your patience.",
    channelCode: "PORTAL"
  },
  {
    type: "CHAT_QUEUE",
    message:
      "You are currently number {0} in queue. Thank you for your patience.",
    channelCode: "APP"
  }
];

if (messages.length > 0) {
  DefaultMessage.collection.insertMany(messages, (err, res) => {
    mongoose.disconnect();
  });
}
