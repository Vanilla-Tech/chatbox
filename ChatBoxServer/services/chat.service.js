var redisHelper = require("../helpers/redishelper");
var constants = require("../helpers/applicationconstants");
var _ = require("underscore");
var helpers = require("../helpers/common");
var axiosInstance = require("../helpers/apiHelper").axiosInstance;

async function submitOfflineData(data) {
  try {
    await axiosInstance.post("/email/offline", data);
  } catch (error) {
    console.log("offlineDtaSubmitError");
  }
}

async function fetchUnReceivedMessages(isAgent, messageId) {
  try {
    var response = await axiosInstance.get(
      `/${isAgent ? "chatforagent" : "chatforcustomer"}/${messageId}`
    );
    return response.data;
  } catch (error) {
    console.log("fetchUnReceivedMessages Error", error);
  }
}

async function addUpdateChatHistory(
  chatId,
  message,
  isAgentChat,
  messageId,
  timeStamp,
  isChatNote,
  isFile,
  originalFileName
) {
  try {
    var chatHistory = {
      chatId: chatId,
      messageId: messageId,
      timeStamp: new Date(timeStamp + "Z"),
      message: message,
      status: "PENDING",
      isAgentChat: isAgentChat,
      isChatNote: isChatNote,
      isFile: isFile,
      originalFileName: originalFileName,
    };
    var response = await axiosInstance.post(
      "/chat/saveChatHistory",
      chatHistory
    );
    return response.data;
  } catch (err) {
    console.log("save chat history error", err);
  }
}

async function getChatHistory(req) {
  try {
    var response = await axiosInstance.post("/chat/chathistorybyagent", req);
    return response.data;
  } catch (err) {
    console.log("getChatHistory Error");
  }
  //var chatmessages=await redisHelper.c
}
async function addChatPair(
  agentSessionId,
  customerSessionId,
  agentId,
  customerId,
  requestIp,
  departmentCode,
  channelCode
) {
  var chatPair = {
    agentId: agentId,
    customerId: customerId,
    startTime: new Date(),
    endTime: null,
    status: "ONGOING_CHAT",
    markedAsDone: false,
    requestIp: requestIp,
    rating: null,
    customerSessionId: customerSessionId,
    agentSessionId: agentSessionId,
    departmentCode: departmentCode,
    channelCode: channelCode,
  };

  var responsedata = null;
  try {
    responsedata = await axiosInstance.post("/chat/saveChat", {
      agentId: agentId,
      agentSessionId: agentSessionId,
      customerId: customerId,
      customerSessionId: customerSessionId,
      startTime: chatPair.startTime,
      requestIP: chatPair.requestIp,
      channelCode: chatPair.channelCode,
      status: chatPair.status,
      departmentCode: chatPair.departmentCode,
    });
  } catch (error) {
    console.log("savechat:err", error);
  }
  chatPair.chatId = responsedata.data.chatId;
  chatPair.idleTimeout = responsedata.data.idleTimeout;
  var chatPairs = [];
  chatPairs = await redisHelper
    .fetchChats()
    .then(function (d) {
      return d == null ? [] : d;
    })
    .catch(function (err) {
      return [];
    });

  if (chatPairs.length > 0) {
    chatPairs = chatPairs.filter((c) => c.customerId !== customerId);
  }

  chatPairs.push(chatPair);
  await redisHelper.updateChatPairs(chatPairs);
  await resetAgentCustomerConnect(chatPairs);
  return chatPair;
}

async function resetAgentCustomerConnect(chatPairs) {
  var connectedAgents = await redisHelper
    .fetchConnectedAgents()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  if (!connectedAgents) return;

  var updatedAgents = [];

  for (let index = 0; index < connectedAgents.length; index++) {
    const connectedAgent = connectedAgents[index];
    let count = chatPairs.filter(
      (c) => c.agentId === connectedAgent.agentId && c.status === "ONGOING_CHAT"
    ).length;
    connectedAgent.assignedCustomerCount = count;
    updatedAgents.push(connectedAgent);
  }
  await redisHelper.updateConnectedAgents(updatedAgents);
}

async function initiateCloseOrMarkAsDone(markedAsDone, customerSessionId) {
  var chatpairs = await redisHelper.fetchChats();
  if (chatpairs && chatpairs.length > 0) {
    var chatPair = _.find(
      chatpairs,
      (x) =>
        x.status == "ONGOING_CHAT" && x.customerSessionId == customerSessionId
    );
    if (chatPair) {
      chatPair.markedAsDone = markedAsDone;
      chatPair.endTime = new Date();
      chatPair.status = chatPair.markedAsDone ? "DONE_CHAT" : "CLOSE_CHAT";
      await redisHelper.updateChatPairs(chatpairs);

      await axiosInstance.post("/chat/updateChat", {
        chatId: chatPair.chatId,
        endTime: new Date(),
        status: markedAsDone ? "DONE_CHAT" : "CLOSE_CHAT",
      });
    }
  }
}

async function getChatPair(customerSessionId) {
  var chatPairs = await redisHelper
    .fetchChats()
    .then(function (d) {
      return d;
    })
    .catch(function (err) {
      return null;
    });
  if (chatPairs == null) return null;

  var retdata = _.find(
    chatPairs,
    (x) => x.customerSessionId == customerSessionId
  );
  return retdata;
}

async function getChatPairByAgentSession(agenSessionId) {
  var chatPairs = await redisHelper
    .fetchChats()
    .then(function (d) {
      return d;
    })
    .catch(function (err) {
      return null;
    });
  if (chatpairs == null) return null;

  var retdata = _.find(chatPairs, (x) => x.agentSessionId == agenSessionId);
  return retdata;
}
async function getActiveChatPair(customerSessionId) {
  var chatPairs = await redisHelper
    .fetchChats()
    .then(function (d) {
      return d;
    })
    .catch(function (err) {
      return null;
    });
  var data = _.find(
    chatPairs,
    (x) =>
      x.customerSessionId == customerSessionId && x.status == "ONGOING_CHAT"
  );
  return data;
}

async function getActiveChatPairByAgentSession(agenSessionId) {
  var chatPairs = await redisHelper
    .fetchChats()
    .then(function (d) {
      return d;
    })
    .catch(function (err) {
      return null;
    });
  if (chatpairs == null) return null;

  var retdata = _.find(
    chatPairs,
    (x) => x.agentSessionId == agenSessionId && x.status == "ONGOING_CHAT"
  );
  return retdata;
}

async function deleteCustomerChatFromRedis(chatId) {
  var chats = await redisHelper
    .fetchChats()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  var chatToClose = _.find(
    chats,
    (x) => x.chatId == chatId && x.status != "ONGOING_CHAT"
  );
  if (chatToClose) {
    chats = _.filter(chats, (x) => x.chatId != chatId);
    await redisHelper.updateChatPairs(chats);
  }
}

async function terminateChat(customerSessionId, timeStamp) {
  var chats = await redisHelper
    .fetchChats()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  var activechat = _.find(
    chats,
    (x) =>
      x.status == "ONGOING_CHAT" && x.customerSessionId == customerSessionId
  );
  if (!activechat) return;
  activechat.status = activechat.markedAsDone ? "DONE_CHAT" : "CLOSE_CHAT";
  activechat.endTime = timeStamp;
  activechat.rating = 0;
  await redisHelper.updateChatPairs(chats);
  await migrateChatToServer(activechat.chatId);
}
async function migrateChatToServer(chatId) {
  var chats = await redisHelper
    .fetchChats()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  if (chats == null) return;
  var chattoMigrate = _.find(chats, (x) => x.chatId == chatId);
  if (chattoMigrate == null) return;
  try {
    terminateChatResponse = await axiosInstance.post("/chat/updateChat", {
      chatId: chatId,
      endTime: chattoMigrate.endTime,
      status: chattoMigrate.status,
      rating: chattoMigrate.rating,
    });
    chats = _.filter(chats, (x) => x.chatId != chatId);
    await redisHelper.updateChatPairs(chats);
  } catch (error) {
    console.log("migration:error", error);
    throw error;
  }
}
async function rateChat(customerSessionId, rating) {
  var rateTime = new Date();
  var chats = await redisHelper
    .fetchChats()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  var activechat = _.find(
    chats,
    (x) =>
      (x.status == "ONGOING_CHAT" ||
        x.status == "DONE_CHAT" ||
        x.status == "CLOSE_CHAT") &&
      x.customerSessionId == customerSessionId
  );
  activechat.rating = rating;
  // activechat.endTime = rateTime
  //  activechat.status = activechat.markedAsDone ? 'DONE_CHAT' : 'CLOSE_CHAT'
  await redisHelper.updateChatPairs(chats);
  await migrateChatToServer(activechat.chatId);
}

async function getConnectedCustomer(sessionId) {
  var connectedCustomers = await redisHelper
    .fetchConnectedCustomers()
    .then(function (d) {
      return d;
    })
    .catch(function () {
      return null;
    });
  if (!connectedCustomers) return null;
  var data = _.find(
    connectedCustomers,
    (x) => x.customerSessionId == sessionId && x.isOnline == true
  );
  return data;
}

async function getCustomer(sessionId) {
  var connectedCustomers = await redisHelper
    .fetchConnectedCustomers()
    .then(function (d) {
      return d;
    })
    .catch(function () {
      return null;
    });
  if (!connectedCustomers) return null;
  var data = _.find(
    connectedCustomers,
    (x) => x.customerSessionId == sessionId
    // && x.isOnline == true
  );
  return data;
}

async function isAgentLoggedIn(agentId, opts, cb) {
  try {
    var connectedAgents = await redisHelper.fetchConnectedAgents();
    if (opts.isStaffId) {
      if (connectedAgents && connectedAgents.length > 0) {
        var connectedAgent = _.find(
          connectedAgents,
          (x) =>
            x.staffId.toLowerCase() == agentId.toLowerCase() &&
            x.isOnline == true
        );
        if (connectedAgent) {
          if (cb != null) cb();
          return true;
        }
      }
    } else if (opts.isSessionId) {
      if (connectedAgents && connectedAgents.length > 0) {
        var connectedAgent = _.find(
          connectedAgents,
          (x) => x.agentSessionId != agentId && x.isOnline == true
        );
        if (connectedAgent) {
          if (cb != null) cb();
          return true;
        }
      }
    } else {
      if (connectedAgents && connectedAgents.length > 0) {
        var connectedAgent = _.find(
          connectedAgents,
          (x) => x.agentId == agentId && x.isOnline == true
        );
        if (connectedAgent) {
          if (cb != null) cb();
          return true;
        }
      }
    }

    return false;
  } catch (error) {
    return false;
  }
}

async function getConnectedAgent(sessionId) {
  var connectedagents = await redisHelper
    .fetchConnectedAgents()
    .then(function (d) {
      return d;
    })
    .catch(function () {
      return null;
    });
  if (!connectedagents) return null;
  return _.find(
    connectedagents,
    (x) => x.agentSessionId == sessionId && x.isOnline == true
  );
}

async function getAgent(sessionId) {
  var connectedagents = await redisHelper
    .fetchConnectedAgents()
    .then(function (d) {
      return d;
    })
    .catch(function () {
      return null;
    });
  if (!connectedagents) return null;
  return _.find(connectedagents, (x) => x.agentSessionId == sessionId);
}

async function removeConnectedAgent(sessionId) {
  var connectedAgents = await redisHelper
    .fetchConnectedAgents()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  if (connectedAgents && connectedAgents.length > 0) {
    connectedAgents = _.filter(
      connectedAgents,
      (x) => x.agentSessionId != sessionId
    );
  }
  await redisHelper.updateConnectedAgents(connectedAgents);
}
async function removeConnectedCustomer(sessionid) {
  var connectedCustomers = await redisHelper
    .fetchConnectedCustomers()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  connectedCustomers = _.filter(
    connectedCustomers,
    (x) => x.customerSessionId != sessionid
  );

  await redisHelper.updateConnectedCustomers(connectedCustomers);
}

async function removeConnectedAgentBySocketId(socketid) {
  var connectedAgents = await redisHelper
    .fetchConnectedAgents()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  if (!connectedAgents) return;

  connectedAgents = _.filter(connectedAgents, (x) => x.socketId != socketid);
  await redisHelper.updateConnectedAgents(connectedAgents);
}
async function removeConnectedCustomerBySocketId(socketid) {
  var connectedCustomers = await redisHelper
    .fetchConnectedCustomers()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  if (!connectedCustomers) return;

  connectedCustomers = _.filter(
    connectedCustomers,
    (x) => x.socketId != socketid
  );
  await redisHelper.updateConnectedCustomers(connectedCustomers);
}
async function addConnectedAgent(
  socketid,
  sessionid,
  agentid,
  threshold,
  assignedCustomerCount,
  departments,
  email,
  name,
  staffId,
  status
) {
  var connectedAgent = {
    socketId: socketid,
    agentSessionId: sessionid,
    departments: departments,
    agentId: agentid,
    threshold: threshold,
    assignedCustomerCount: assignedCustomerCount,
    email: email,
    name: name,
    isOnline: true,
    staffId: staffId,
    status: status ? status : "ONLINE",
  };
  var connectedAgents = [];
  connectedAgents = await redisHelper.fetchConnectedAgents();
  connectedAgents = connectedAgents === null ? [] : connectedAgents;
  if (connectedAgent.length > 0) {
    connectedAgents = connectedAgents.filter((c) => c.agentId !== agentid);
  }
  connectedAgents.push(connectedAgent);
  await redisHelper.updateConnectedAgents(connectedAgents);
}

async function removeExistingAgentSession(staffId) {
  try {
    var connectedAgents = await redisHelper.fetchConnectedAgents();
    if (connectedAgents != null && connectedAgents.length > 0) {
      var offlineAgent = _.find(
        connectedAgents,
        (x) => x.staffId == staffId && x.isOnline == false
      );
      if (offlineAgent != null) {
        connectedAgents = _.filter(
          connectedAgents,
          (x) => x.agentSessionId != offlineAgent.agentSessionId
        );
        await redisHelper.updateConnectedAgents(connectedAgents);
        return offlineAgent.agentSessionId;
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function updateConnectedAgent(socketid, sessionid) {
  var connectedAgents = await redisHelper
    .fetchConnectedAgents()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return [];
    });
  var connectedAgent = _.find(
    connectedAgents,
    (x) => x.agentSessionId == sessionid
  );
  if (!connectedAgent) return;
  connectedAgent.socketId = socketid;
  await redisHelper.updateConnectedAgents(connectedAgents);
}

async function UpdateAgentStatus(sessionid, status) {
  var connectedAgents = await redisHelper
    .fetchConnectedAgents()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return [];
    });
  var connectedAgent = _.find(
    connectedAgents,
    (x) => x.agentSessionId == sessionid
  );
  if (!connectedAgent) return;
  connectedAgent.status = status;
  await redisHelper.updateConnectedAgents(connectedAgents);
}

async function addConnectedCustomer(
  socketid,
  sessionid,
  customerid,
  name,
  email,
  mobileNumber
) {
  let res = 0;
  var connectedCusomter = {
    socketId: socketid,
    customerSessionId: sessionid,
    customerId: customerid,
    isOnline: true,
    name: name,
    email: email,
    mobileNumber: mobileNumber,
  };
  var connectedCustomers = await redisHelper
    .fetchConnectedCustomers()
    .then(function (d) {
      return d == null ? [] : d;
    })
    .catch(function (e) {
      return new Array();
    });
  if (connectedCustomers.length > 0) {
    connectedCustomers = connectedCustomers.filter(
      (c) => c.customerId !== customerid
    );
  }
  connectedCustomers.push(connectedCusomter);
  await redisHelper.updateConnectedCustomers(connectedCustomers);
  return res;
}

async function updateConnectedCustomer(socketid, sessionid) {
  var connectedCustomers = await redisHelper
    .fetchConnectedCustomers()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return [];
    });
  var connectedCustomer = _.find(
    connectedCustomers,
    (x) => x.customerSessionId == sessionid
  );
  if (connectedCustomer) {
    connectedCustomer.socketId = socketid;
  }
  await redisHelper.updateConnectedCustomers(connectedCustomers);
}
async function getConnectedAgentsByDepartment(departmentCode) {
  var connectedAgents = await redisHelper
    .fetchConnectedAgents()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  if (!connectedAgents) return null;
  var agentsByDepartment = _.filter(
    connectedAgents,
    (x) =>
      x.isOnline == true &&
      _.find(x.departments, (x) => x.code == departmentCode) != null
  );
  return agentsByDepartment;
}

async function getConnectedCustomerBySocketId(socketId) {
  var connectedCustomers = await redisHelper
    .fetchConnectedCustomers()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  if (!connectedCustomers) return null;
  var data = _.find(connectedCustomers, (x) => x.socketId == socketId);
  return data;
}
async function getConnectedAgentBySocketId(socketId) {
  var connectedagents = await redisHelper
    .fetchConnectedAgents()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  if (!connectedagents) return null;
  var data = _.find(connectedagents, (x) => x.socketId == socketId);
  return data;
}

async function getAgentConnectedCustomers(agentSessionId) {
  var agentCustomerSessions = await redisHelper
    .fetchChats()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  if (!agentCustomerSessions) return null;
  var activeAgentCustomerSessions = _.filter(
    agentCustomerSessions,
    (x) => x.status == "ONGOING_CHAT" && x.agentSessionId == agentSessionId
  );
  if (
    activeAgentCustomerSessions == null ||
    activeAgentCustomerSessions.length < 1
  )
    return null;

  var sessionIdsList = _.map(activeAgentCustomerSessions, (x) => {
    return x.customerSessionId;
  });
  var connectedCustomers = await redisHelper
    .fetchConnectedCustomers()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  if (!connectedCustomers) return null;

  var agentCustomers = _.filter(connectedCustomers, (x) =>
    _.contains(sessionIdsList, x.customerSessionId)
  );
  return agentCustomers;
}

async function updateAgentCustomerAssignedCount(agentId, count) {
  var connectedAgents = await redisHelper
    .fetchConnectedAgents()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  if (!connectedAgents) return;
  var connectedAgent = _.find(connectedAgents, (x) => x.agentId === agentId);
  if (!connectedAgent) return null;
  connectedAgent.assignedCustomerCount = count;
  await redisHelper.updateConnectedAgents(connectedAgents);
}

async function updateAgentCustomerCount(sessionId) {
  var connectedAgents = await redisHelper
    .fetchConnectedAgents()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  if (!connectedAgents) return;
  var connectedAgent = _.find(
    connectedAgents,
    (x) => x.agentSessionId == sessionId
  );
  if (!connectedAgent) return null;
  connectedAgent.assignedCustomerCount += 1;
  await redisHelper.updateConnectedAgents(connectedAgents);
}

async function decreaseAgentCustomerCount(sessionId) {
  var connectedAgents = await redisHelper
    .fetchConnectedAgents()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  if (!connectedAgents) return;
  var connectedAgent = _.find(
    connectedAgents,
    (x) => x.agentSessionId == sessionId
  );
  if (!connectedAgent) return null;
  connectedAgent.assignedCustomerCount -= 1;
  await redisHelper.updateConnectedAgents(connectedAgents);
}
async function updateCustomersOnlineStatus(socketId, isOnline) {
  var connectedCustomers = await redisHelper
    .fetchConnectedCustomers()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  if (!connectedCustomers) return;
  var connectedCustomer = _.find(
    connectedCustomers,
    (x) => x.socketId == socketId
  );
  if (!connectedCustomer) return;
  connectedCustomer.isOnline = isOnline;
  await redisHelper.updateConnectedCustomers(connectedCustomers);
}

async function updateAgentsOnlineStatus(socketId, isOnline) {
  var connectedAgents = await redisHelper
    .fetchConnectedAgents()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  if (!connectedAgents) return;
  var connectedAgent = _.find(connectedAgents, (x) => x.socketId == socketId);
  if (!connectedAgent) return;
  connectedAgent.isOnline = isOnline;
  await redisHelper.updateConnectedAgents(connectedAgents);
}

async function isSocketAgent(socketId) {
  var connectedAgents = await redisHelper
    .fetchConnectedAgents()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  if (!connectedAgents) return false;
  var connectedAgent = _.find(connectedAgents, (x) => x.socketId == socketId);
  if (connectedAgent) return true;
  return false;
}

async function getActiveDepartments(currentDate) {
  var connectedAgents = await redisHelper
    .fetchConnectedAgents()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  if (connectedAgents != null) {
    var currentActiveAgentsDepartments = _.chain(
      _.filter(connectedAgents, (x) => x.isOnline == true)
    )
      .pluck("departments")
      .flatten()
      .value();
    return _.uniq(currentActiveAgentsDepartments);
  }
  return null;
}

async function getActiveDepartmentsForTransfer(agentSessionId) {
  var connectedAgents = await redisHelper
    .fetchConnectedAgents()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  var currentAgent = _.find(
    connectedAgents,
    (x) => x.agentSessionId == agentSessionId
  );
  if (connectedAgents != null) {
    var currentActiveAgentsDepartments = _.chain(
      _.filter(
        connectedAgents,
        (x) =>
          x.isOnline == true &&
          x.agentSessionId != agentSessionId &&
          x.status == "ONLINE" &&
          x.assignedCustomerCount < x.threshold
      )
    )
      .pluck("departments")
      .flatten()
      .value();
    var uniqueDepartments = _.uniq(currentActiveAgentsDepartments, function (
      x
    ) {
      return x.code;
    });
    var returnDepartments = uniqueDepartments.filter(
      (m) => !currentAgent.departments.map((x) => x.code).includes(m.code)
    );
    return _.uniq(returnDepartments);
  }
  return null;
}

async function transferAgentChat(
  customerSessionId,
  agentSessionId,
  transferAgentId
) {
  var connectedAgents = await redisHelper
    .fetchConnectedAgents()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  var transferAgent = _.find(
    connectedAgents,
    (x) => x.agentId == transferAgentId
  );

  if (transferAgent == null) return null;
  if (transferAgent.assignedCustomerCount >= transferAgent.threshold)
    return null;
  var currentAgent = _.find(
    connectedAgents,
    (x) => x.agentSessionId == agentSessionId && x.isOnline == true
  );

  var chats = await redisHelper
    .fetchChats()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  var currentChat = _.find(
    chats,
    (x) =>
      x.customerSessionId == customerSessionId &&
      x.agentSessionId == agentSessionId &&
      x.status == "ONGOING_CHAT"
  );
  currentChat.status = "TRANSFER_CHAT";
  currentChat.rating = 0;
  currentChat.endTime = new Date();
  await redisHelper.updateChatPairs(chats);
  await this.addChatPair(
    transferAgent.agentSessionId,
    customerSessionId,
    transferAgent.agentId,
    currentChat.customerId,
    currentChat.requestIp,
    currentChat.departmentCode,
    currentChat.channelCode
  );

  //await this.updateAgentCustomerCount(transferAgent.agentSessionId);
  //await this.decreaseAgentCustomerCount(agentSessionId);
  await migrateChatToServer(currentChat.chatId);
  return {
    TransferConnecteAgent: transferAgent,
    CurrentAgent: currentAgent,
  };
}

async function transferChatToDepartment(
  customerSessionId,
  agentSessionId,
  transferDepartmentCode
) {
  var connectedAgents = await redisHelper
    .fetchConnectedAgents()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });

  var availableAgents = _.filter(
    connectedAgents,
    (x) =>
      x.isOnline &&
      x.agentSessionId != agentSessionId &&
      x.assignedCustomerCount < x.threshold &&
      _.find(x.departments, (a) => a.code == transferDepartmentCode) != null
  );

  if (availableAgents == null || availableAgents.length < 1) return null;
  var transferAgentDetails = _.find(
    connectedAgents,
    (x) => x.agentSessionId == agentSessionId
  );

  var adminwithLowestAssignedCustomer = _.min(
    availableAgents,
    (x) => x.assignedCustomerCount
  );

  var chats = await redisHelper
    .fetchChats()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  var currentChat = _.find(
    chats,
    (x) =>
      x.customerSessionId == customerSessionId &&
      x.agentSessionId == agentSessionId &&
      x.status == "ONGOING_CHAT"
  );
  if (currentChat) {
    currentChat.status = "TRANSFER_CHAT";
    currentChat.rating = 0;
    currentChat.endTime = new Date();
  }
  await redisHelper.updateChatPairs(chats);
  await addChatPair(
    adminwithLowestAssignedCustomer.agentSessionId,
    customerSessionId,
    adminwithLowestAssignedCustomer.agentId,
    currentChat.customerId,
    currentChat.requestIp,
    currentChat.departmentCode,
    currentChat.channelCode
  );

  await this.updateAgentCustomerCount(
    adminwithLowestAssignedCustomer.agentSessionId
  );
  await this.decreaseAgentCustomerCount(agentSessionId);
  await migrateChatToServer(currentChat.chatId);
  return {
    adminwithLowestAssignedCustomer: adminwithLowestAssignedCustomer,
    sourceAgentDetails: {},
    sourceDepartmentDetails: {},
  };
}

// async function isAgentLoggedIn(agentId) {
//   // var data = await ConnectedAgent.findOne({ "agent": agentId, isOnline: true }).exec().then(function (data) {
//   //   return data;
//   // }).catch(function (err) {
//   //   return null;
//   // });
//   // return !data;
// }
async function getActiveAgentsForTransfer(agentSessionId) {
  var connectedAgents = await redisHelper
    .fetchConnectedAgents()
    .then(function (d) {
      return d;
    })
    .catch(function (e) {
      return null;
    });
  if (!connectedAgents) return null;
  var connectedAgent = _.find(
    connectedAgents,
    (x) => x.agentSessionId == agentSessionId
  );

  if (connectedAgent && connectedAgent.departments) {
    var departmentCodes = _.map(connectedAgent.departments, (x) => {
      return x.code;
    });

    var otherAgentsList = _.filter(
      connectedAgents,
      (x) =>
        x.agentSessionId != agentSessionId &&
        x.status == "ONLINE" &&
        x.assignedCustomerCount < x.threshold &&
        _.find(
          x.departments,
          (x) => _.find(departmentCodes, (a) => a == x.code) != null
        )
    );

    var returnAgentsListObject = {};
    var returnAgentsList = [];
    otherAgentsList.forEach(function (agent) {
      agent.departments.forEach(function (department) {
        if (!returnAgentsListObject[department.code]) {
          returnAgentsListObject[department.code] = {
            code: department.code,
            name: department.displayName,
            agents: [],
          };
          returnAgentsList.push(returnAgentsListObject[department.code]);
        }

        returnAgentsListObject[department.code].agents.push({
          agentName: agent.name,
          status: agent.status,
          agentEmail: agent.email,
          agentId: agent.agentId,
          staffId: agent.staffId,
        });
      });
    });
    returnAgentsList = returnAgentsList.filter((x) =>
      departmentCodes.includes(x.code)
    );
    return returnAgentsList;
  }
  return null;
}

async function getInAppMessage(channelCode, messageType) {
  try {
    return _.find(
      constants.inAppMessages,
      (x) => x.channelCode == channelCode && x.messageType == messageType
    );
  } catch (error) {}
}

var inAppMessages = function () {
  var getFormattedWelComeMessage = async (channelCode, name) => {
    var message = await chatService.getInAppMessage(
      channelCode,
      constants.inAppMessage.WELCOMEMESSAGE
    );
    return formatter(message, [name]);
  };
  var getFormattedAgentBusyMessage = async (channelCode, name) => {
    var message = await chatService.getInAppMessage(
      channelCode,
      constants.inAppMessage.AGENTBUSYMESSAGE
    );
    return formatter(message);
  };
  var chatTransferMessage = async (channelCode, name) => {
    var message = await chatService.getInAppMessage(
      channelCode,
      constants.inAppMessage.AGENTBUSYMESSAGE
    );
    return formatter(message);
  };

  return {
    getFormattedWelComeMessage,
    getFormattedAgentBusyMessage,
  };
};

module.exports = {
  updateAgentCustomerCount,
  getConnectedAgentsByDepartment,
  updateConnectedCustomer,
  addConnectedCustomer,
  updateConnectedAgent,
  addConnectedAgent,
  rateChat,
  terminateChat,
  getActiveChatPairByAgentSession,
  getActiveChatPair,
  getChatPairByAgentSession,
  getChatPair,
  addChatPair,
  getChatHistory,
  addUpdateChatHistory,
  removeConnectedCustomerBySocketId,
  removeConnectedAgentBySocketId,
  removeConnectedCustomer,
  removeConnectedAgent,
  getConnectedAgentBySocketId,
  getConnectedCustomerBySocketId,
  getConnectedCustomer,
  getConnectedAgent,
  getAgentConnectedCustomers,
  isSocketAgent,
  updateAgentsOnlineStatus,
  updateCustomersOnlineStatus,
  transferAgentChat,
  transferChatToDepartment,
  getActiveDepartments,
  getActiveAgentsForTransfer,
  decreaseAgentCustomerCount,
  submitOfflineData,
  deleteCustomerChatFromRedis,
  getActiveDepartmentsForTransfer,
  isAgentLoggedIn,
  removeExistingAgentSession,
  initiateCloseOrMarkAsDone,
  getInAppMessage,
  getCustomer,
  getAgent,
  UpdateAgentStatus,
  fetchUnReceivedMessages,
  //addUpdateInAppMessages
};
