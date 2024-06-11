const socketaction = {
    ADDUSER: 'adduser',
    LOGINAGENT: 'addagent',
    LOGINSUCCESS: 'loginsuccess',
    UPDATEUSER: 'updateuser',
    UPDATEUSERACK: 'updateuserack',
    UPDATEAGENT: 'updateagent',
    REFRESHUSER: 'refreshuser',
    CONFIRMADDUSER: 'useraddconfirmed',
    NEWUSERADDED: 'useradded',
    ADDAGENT: 'addadmin',
    INVALIDSOURCEAPP: 'invalidsourceapp',
    CHATMESSAGE: 'chatmessage',
    CHATMESSAGECONFIRMATION: 'chatmessageconfirm',
    SEENCONFIRMATION: 'seenconfirmation',
    LOGOFF: 'logoff',
    NOAGENTSAVAILABLE: 'noagentsavailable',
    AGENTAVAILABLE: 'agentAvailable',
    TYPING: 'typing',
    CHATHISTORY: 'chathistory',
    INITIALIZECHATBOX: 'initializechatbox',
    POSTINITIALIZECHATBOX: 'postinitializechatbox',
    CLOSECHAT: 'closechat',
    RATECHAT: 'ratechat',
    CONFIRMCLOSECHAT: 'confirmclosechat',
    CUSTOMERDISCONNECTED: 'customerdisconnected',
    AGENTDISCONNECTED: 'agentdisconnected',
    CUSTOMERONLINESTATUS: 'customeronlinestatus',
    AGENTONLINESTATUS: 'agentonlinestatus',
    INITIATETRANSFERCHAT: 'initiatetransferchat',
    INITIATETRANSFERCHATACK: 'initiatetransferchatack',
    TRANSFERCHAT: 'transerchat',
    TRANSFERCHATTODEPARTMENT: 'transferchattodepartment',
    DEPARTMENTOFFLINE: 'departmentOffline',
    OFFLINEDATASUBMITTED: 'offlinedatasubmitted',
    OFFLINEDATASUBMITTEDACK: 'offlinedatasubmittedack',
    RECONNECTING : 'reconnecting',
    DISCONNECT : 'disconnect',
    RECONNECT : 'reconnect',
    CONNECT : 'connect',
    MOREDATA:'moredata',
    FILEUPLOADED:'fileuploaded',
    UPLOAD:'upload',
    ENDCHATCUSTOMER:'endchatcustomer',
    ENDCHATCUSTOMERACK:'endchatcustomerack',
    FETCHUNRECEIVEDMESSAGES:"fetchunreceivedmessages",
    UNRECEIVEDMESSAGES:"unreceivedmessages" ,
    FETCHCHATHISTORY:"fetchchathistory",
    CHATHISTORY:"chathistory" 
}

const appconstant = {
    PRECHATFORM : 'prechatform',
    ONLINEFORM : 'onlineform',
    OFFLINEFORM : 'offlineform',
    OFFLINESUBMITFORM : 'offlinesubmitform',
    ACTIVEFORM : 'activeform',
    CUSTOMERSESSIONID : 'customersessionid',
    CHATCLOSED : 'chatclosed',
    ANNOUNCEMENTBANNERTEXT:'ab',
    OFFLINEFORMTEXT:'ot'
}
 
const error = {
    DEPARTMENTCODEMISSING : 'Department  Code is missing',
    CHANNELCODEMISSING: 'channelCode is missing',
    INVALIDDEPARTMENTORCHANNELCODE : 'Invalid Client or channel code',
    AGENTDISCONNECTED : 'Please wait until we get back to you',
    INTERNETCONNECTION:'Please check your internet connection...'
}
const message={
    INPUTPLACEHOLDER:"Type a message here"
}

export default{
    socketaction : socketaction,appconstant : appconstant,error : error,message:message
}