applicationconstants = (function () {
  return{
    chatactions: {
        ADDUSER: 'adduser',
        LOGINAGENT:'addagent',
        LOGINSUCCESS:'loginsuccess',
        UPDATEUSER:'updateuser',
        UPDATEAGENT:'updateagent',
        REFRESHUSER:'refreshuser',
        CONFIRMADDUSER: 'useraddconfirmed',
        NEWUSERADDED: 'useradded',
        ADDAGENT:'addadmin',
        INVALIDSOURCEAPP: 'invalidsourceapp',
        CHATMESSAGE: 'chatmessage',
        CHATMESSAGECONFIRMATION:'chatmessageconfirm',
        SEENCONFIRMATION:'seenconfirmation',
        LOGOFF:'logoff',
        NOAGENTSAVAILABLE:"noagentsavailable",
        AGENTAVAILABLE:'agentAvailable',
        TYPING:"typing",
        CHATHISTORY:"chathistory",
        INITIALIZECHATBOX:'initializechatbox',
        POSTINITIALIZECHATBOX:'postinitializechatbox',
        CLOSECHAT:'closechat',
        RATECHAT:'ratechat',
        CONFIRMCLOSECHAT:'confirmclosechat',
        CUSTOMERDISCONNECTED:'customerdisconnected',
        AGENTDISCONNECTED:'agentdisconnected',
        CUSTOMERONLINESTATUS:'customeronlinestatus',
        AGENTONLINESTATUS:'agentonlinestatus',
        INITIATETRANSFERCHAT:'initiatetransferchat',
        INITIATETRANSFERCHATACK:'initiatetransferchatack',
        TRANSFERCHAT:'transerchat',
        TRANSFERCHATTODEPARTMENT:'transferchattodepartment',
    },
    chatactionData:{
        NOADMINSAVAILABLE:{
            message:"We will reach to you soon!"
        }
    }
  }
})();

// module.exports = {
//     chatactions: {
//         ADDUSER: 'addUser',
//         CONFIRMADDUSER: 'useraddconfirmed',
//         NEWUSERADDED: 'useradded',
//         INVALIDSOURCEAPP: 'invalidSourceapp',
//         CHATMESSAGE: 'chatmessage',
//         LOGOFF:'logoff',
//         NOADMINSAVAILABLE:"noadminsavailable"
//     },
//     chatactionData:{
//         NOADMINSAVAILABLE:{
//             message:"We will reach to you soon!"
//         }

//     }

// }