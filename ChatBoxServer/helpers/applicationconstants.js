var formatter = require("string-template");

module.exports = {
  inAppMessages: [
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
  ],

  chatactions: {
    ADDUSER: "adduser",
    LOGINAGENT: "addagent",
    LOGINSUCCESS: "loginsuccess",
    UPDATEUSER: "updateuser",
    UPDATEUSERACK: "updateuserack",
    UPDATEAGENT: "updateagent",
    REFRESHUSER: "refreshuser",
    CONFIRMADDUSER: "useraddconfirmed",
    NEWUSERADDED: "useradded",
    ADDAGENT: "addagent",
    INVALIDSOURCEAPP: "invalidsourceapp",
    CHATMESSAGE: "chatmessage",
    CHATMESSAGECONFIRMATION: "chatmessageconfirm",
    SEENCONFIRMATION: "seenconfirmation",
    LOGOFF: "logoff",
    NOAGENTSAVAILABLE: "noagentsavailable",
    AGENTAVAILABLE: "agentAvailable",
    AGENTAWAY: "agentaway",
    TYPING: "typing",
    CHATHISTORY: "chathistory",
    INITIALIZECHATBOX: "initializechatbox",
    POSTINITIALIZECHATBOX: "postinitializechatbox",
    CLOSECHAT: "closechat",
    RATECHAT: "ratechat",
    CONFIRMCLOSECHAT: "confirmclosechat",
    CUSTOMERDISCONNECTED: "customerdisconnected",
    AGENTDISCONNECTED: "agentdisconnected",
    CUSTOMERONLINESTATUS: "customeronlinestatus",
    AGENTONLINESTATUS: "agentonlinestatus",
    INITIATETRANSFERCHAT: "initiatetransferchat",
    INITIATETRANSFERCHATACK: "initiatetransferchatack",
    TRANSFERCHAT: "transerchat",
    TRANSFERCHATTODEPARTMENT: "transferchattodepartment",

    NEWUSERTRANSFERRED: "newusertransferred",
    TRANSFERSUCCESFUL: "transfersuccesful",
    DEPARTMENTOFFLINE: "departmentOffline",
    OFFLINEDATASUBMITTED: "offlinedatasubmitted",
    AGENTLOGOFF: "agentlogoff",
    AGENTSESSIONEXISTS: "agentsessionexists",
    ENDCHATCUSTOMER: "endchatcustomer",
    ENDCHATCUSTOMERACK: "endchatcustomerack",
    OFFLINEDATASUBMITTEDACK: "offlinedatasubmittedack",
    INAPPMESSAGE: "inappmessage",
    STARTFILEUPLOAD: "startfileupload",
    INVALIDFILE: "invalidfile",
    MOREDATA: "moredata",
    FILEUPLOADED: "fileuploaded",
    UPLOAD: "upload",
    FETCHUNRECEIVEDMESSAGES:"fetchunreceivedmessages",
    UNRECEIVEDMESSAGES:"unreceivedmessages",
    FETCHCHATHISTORY:"fetchchathistory",
    CHATHISTORY:"chathistory"
  },
  chatactionData: {
    NOAGENTSAVAILABLE: {
      message: `Thank you for reaching us.Please leave your message here and we will get back to you shortly.`
    }
  }
};
