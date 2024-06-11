require("custom-env").env(true, process.cwd() + "//");
const expressApp = require("./config/expressconfig.js");
const express = require("express");
var applicationconstants = require("./helpers/applicationconstants");
var _ = require("underscore");
var redis = require("redis");
var uuid = require("node-uuid");
var agentService = require("./services/agent.service");
var chatService = require("./services/chat.service");
var departmentService = require("./services/department.service");
var customerService = require("./services/customer.service");
var common = require("./helpers/common");
var aesWrapper = require("./helpers/aesWrapper");
var fs = require("fs");
var Files = {};
var fileHelper = require("./helpers/fileHelperbase64");
var exec = require("child_process").exec;

var http = require("http");
var app = expressApp();
app.disable('x-powered-by');

app.use((req, res, next) => {
    res.set({
        //'X-Frame-Options': 'SAMEORIGIN',
        // 'strict-transport-security':'max-age=15552000',
        'Cache-Control': 'public, max-age=31557600',
        'Access-Control-Allow-Origin': 'https://demochat.mtradeasia.com:10443'
    });
    next();
})

global.sessionCheckingList = [];
var server = http.createServer(app);

var io = require("socket.io").listen(server);
io.origins((origin, callback) => {
  // if (origin !== config.env.SOCKET_AGENT && origin !== config.env.SOCKET_CLIENT) {
  //     return callback("origin not allowed", false);
  // }
  callback(null, true);
});

app.use(express.static("public/"));
app.use(express.static("temp/"));

const redisAdapter = require("socket.io-redis");

function addRedisAdapter(io) {
  var pub = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, {
    retry_strategy: function(options) {
      if (options.error.code === "ECONNREFUSED") {
        // This will suppress the ECONNREFUSED unhandled exception
        // that results in app crash
        return;
      }
    },
    returnBuffers: true
  });
  var sub = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, {
    retry_strategy: function(options) {
      if (options.error.code === "ECONNREFUSED") {
        // This will suppress the ECONNREFUSED unhandled exception
        // that results in app crash
        return;
      }
    },
    returnBuffers: true
  });

  io.on("error", (err) => {
    console.log(err);
  });
  pub.on("reconecting", (err) => {
    console.log(err);
  });
  sub.on("reconecting", (err) => {
    console.log(err);
  });
  io.on("uncaughtException", (err) => {
    console.log(err);
  });
  /*HERE IS THE NEW CODE THAT MADE IT WORK*/
  pub.on("error", (err) => {
    console.log(err);
  });
  pub.on("end", (a) => {
    pub.quit();
  });
  sub.on("end", (a) => {
    sub.quit();
  });
  sub.on("error", (err) => {
    console.log(err);
  });
  /*END*/
  io.adapter(redisAdapter({ pubClient: pub, subClient: sub }));
  console.log("redis adapter started");
}

//addRedisAdapter(io);
async function broadCastCustomerOnlineStatus(customerSocketId, status) {
  var connectedCustomer = await chatService.getConnectedCustomerBySocketId(
    customerSocketId
  );
  if (!connectedCustomer) return;
  var chatPair = await chatService.getActiveChatPair(
    connectedCustomer.customerSessionId
  );
  if (!chatPair) return;
  var connectedAgent = await chatService.getConnectedAgent(
    chatPair.agentSessionId
  );
  await chatService.updateCustomersOnlineStatus(customerSocketId, status);
  if (connectedAgent)
    io.to(connectedAgent.socketId).emit(
      applicationconstants.chatactions.CUSTOMERONLINESTATUS,
      {
        isOnline: status,
        customerSessionId: chatPair.customerSessionId
      }
    );
}

async function broadCastAgentOnlineStatus(agentSocketId, status) {
  var connectedAgent = await chatService.getConnectedAgentBySocketId(
    agentSocketId
  );
  if (!connectedAgent) return;
  await chatService.updateAgentsOnlineStatus(agentSocketId, status);
  var connectedCustomers = await chatService.getAgentConnectedCustomers(
    connectedAgent.agentSessionId
  );

  _.each(connectedCustomers, function(c) {
    //emit agent disconnected

    io.to(c.socketId).emit(applicationconstants.chatactions.AGENTONLINESTATUS, {
      isOnline: status
    });
  });
}

io.on("connection", function(socket) {
  socket.on(applicationconstants.chatactions.INITIALIZECHATBOX, async function(
    data
  ) {
    if (!(data.departmentCode && data.channelCode)) {
      socket.emit(applicationconstants.chatactions.POSTINITIALIZECHATBOX, null);
    }
    var relatedDepartment = await departmentService.getDepartmentByDepartmentCode(
      data.departmentCode,
      data.channelCode
    );
    if (relatedDepartment == null) {
      socket.emit(applicationconstants.chatactions.POSTINITIALIZECHATBOX, null);
    }
    socket.emit(applicationconstants.chatactions.POSTINITIALIZECHATBOX, {
      preChatForm: {
        isNameRequired: relatedDepartment.preChatForm.isNameRequired,
        isEmailRequired: relatedDepartment.preChatForm.isEmailRequired,
        isMobileNumberRequired:
        relatedDepartment.preChatForm.isMobileNumberRequired,
        name: relatedDepartment.preChatForm.name,
        email: relatedDepartment.preChatForm.email,
        mobile: relatedDepartment.preChatForm.mobile
      },
      offlineForm: {
        isNameRequired: relatedDepartment.offlineForm.isNameRequired,
        isEmailRequired: relatedDepartment.offlineForm.isEmailRequired,
        isMobileNumberRequired:
        relatedDepartment.offlineForm.isMobileNumberRequired,
        name: relatedDepartment.offlineForm.name,
        email: relatedDepartment.offlineForm.email,
        mobile: relatedDepartment.offlineForm.mobile,
        offlineMessage: relatedDepartment.offlineFormMessage
        // "Our Agents are currently unavailable. Leave an Offline message to us. We will get back to you very soon.",
      },
      announcementBanner: relatedDepartment.announcementBanner
    });
  });

  socket.on(applicationconstants.chatactions.ENDCHATCUSTOMER, async function(
    data
  ) {
    if (data.customerSessionId) {
      var connectedCustomer = await chatService.getConnectedCustomer(
        data.customerSessionId
      );
      if (!connectedCustomer) {
        socket.emit(applicationconstants.chatactions.LOGOFF, {});
        return;
      }
      var chatPair = await chatService.getChatPair(
        connectedCustomer.customerSessionId
      );
      var connectedAgent = await chatService.getConnectedAgent(
        chatPair.agentSessionId
      );
      await chatService.terminateChat(
        connectedCustomer.customerSessionId,
        new Date()
      );

      if (!connectedAgent) return;
      await chatService.decreaseAgentCustomerCount(
        connectedAgent.agentSessionId
      );
      io.to(connectedAgent.socketId).emit(
        applicationconstants.chatactions.CUSTOMERDISCONNECTED,
        {
          customerSessionId: chatPair.customerSessionId
        }
      );

      await chatService.removeConnectedCustomer(data.customerSessionId);
      io.to(connectedCustomer.socketId).emit(
        applicationconstants.chatactions.ENDCHATCUSTOMERACK,
        {}
      );
    }
  });
  var heartBeatTimer = null;
  socket.on(applicationconstants.chatactions.CHATMESSAGE, async function(
    data
  ) {
    if (heartBeatTimer) clearTimeout(heartBeatTimer);
    var chatPair = await chatService.getActiveChatPair(data.customerSessionId);
    if (!chatPair) return;
    if (!chatPair.agentSessionId) return;
    var customer = await chatService.getConnectedCustomer(
      data.customerSessionId
    );
    var agent = await chatService.getConnectedAgent(chatPair.agentSessionId);
    heartBeatTimer = setTimeout(async function() {
      var customerSessionId = data.customerSessionId;
      var connectedCustomer = await chatService.getConnectedCustomer(
        customerSessionId
      );
      //if (!connectedCustomer) return
      var chatPair = await chatService.getActiveChatPair(
        data.customerSessionId
      );

      await chatService.terminateChat(data.customerSessionId, new Date());
      if (!chatPair) return;
      var connectedAgent = await chatService.getConnectedAgent(
        chatPair.agentSessionId
      );

      if (connectedAgent) {
        await chatService.decreaseAgentCustomerCount(
          connectedAgent.agentSessionId
        );
        io.to(connectedAgent.socketId).emit(
          applicationconstants.chatactions.CUSTOMERDISCONNECTED,
          {
            customerSessionId: chatPair.customerSessionId
          }
        );
      }
      if (connectedCustomer) {
        io.to(connectedCustomer.socketId).emit(
          applicationconstants.chatactions.LOGOFF,
          {}
        );
      }
      await chatService.removeConnectedCustomer(customerSessionId);
    }, 1000 * 60 * 15);
    if (data.isAgent) {
      if (customer) {
        io.to(customer.socketId).emit(
          applicationconstants.chatactions.CHATMESSAGE,
          data
        );
      }
    } else {
      if (agent) {
        io.to(agent.socketId).emit(
          applicationconstants.chatactions.CHATMESSAGE,
          data
        );
      }
    }
    await chatService.addUpdateChatHistory(
      chatPair.chatId,
      data.message,
      data.isAgent,
      data.messageId,
      data.timeStamp,
      false
    );
  });

  socket.on(applicationconstants.chatactions.UPDATEUSER, async function(data) {
    clearTimeout(logoffTimer);
    var connectedCustomer = await chatService.getCustomer(
      data.customerSessionId
    );
    if (!connectedCustomer) {
      socket.emit(applicationconstants.chatactions.LOGOFF, {});
      return;
    }
    socket.emit(applicationconstants.chatactions.UPDATEUSERACK);
    var chatPair = await chatService.getActiveChatPair(data.customerSessionId);
    await chatService.updateConnectedCustomer(
      socket.id,
      data.customerSessionId
    );

    await broadCastCustomerOnlineStatus(socket.id, true);

    if (chatPair && chatPair.agentSessionId != null) {
      var connectedAgent = await chatService.getAgent(chatPair.agentSessionId);
      if (connectedAgent == null) {
        socket.emit(applicationconstants.chatactions.AGENTDISCONNECTED, {});
        return;
      }
      if (connectedAgent.isOnline == false) {
        socket.emit(applicationconstants.chatactions.AGENTONLINESTATUS, {
          isOnline: false
        });
        return;
      }
    }
  });

  socket.on(applicationconstants.chatactions.UPDATEAGENT, async function(
    data
  ) {
    clearTimeout(logoffTimer);
    var connectedAgent = await chatService.getConnectedAgent(
      data.agentSessionId
    );
    if (!connectedAgent == null) {
      socket.emit(applicationconstants.chatactions.AGENTSESSIONEXISTS, {});
      return;
    }
    await chatService.updateConnectedAgent(socket.id, data.agentSessionId);
    await broadCastAgentOnlineStatus(socket.id, true);
  });

  socket.on(applicationconstants.chatactions.REFRESHUSER, function(data) {
  });

  socket.on(applicationconstants.chatactions.ADDUSER, async function(data) {
    var sessionid = uuid.v4();
    if (!(data.departmentCode && data.channelCode)) {
      socket.emit(applicationconstants.chatactions.INVALIDSOURCEAPP);
      return;
    }
    var relatedDepartment = await departmentService.getActiveDepartmentByDepartmentCode(
      data.departmentCode,
      data.channelCode
    );

    if (relatedDepartment == null) {
      socket.emit(applicationconstants.chatactions.DEPARTMENTOFFLINE);
      return;
    }
    var availableDepartMentAgents = await chatService.getActiveDepartments(
      new Date()
    );
    var availableDepartmentForCustomer = _.find(
      availableDepartMentAgents,
      (x) => x.code == data.departmentCode
    );
    if (
      availableDepartmentForCustomer == null ||
      availableDepartmentForCustomer.length < 1
    ) {
      io.to(socket.id).emit(
        applicationconstants.chatactions.DEPARTMENTOFFLINE,
        applicationconstants.chatactionData.DEPARTMENTOFFLINE
      );
      return;
    }

    var agentSockets = await chatService.getConnectedAgentsByDepartment(
      data.departmentCode
    );
    agentSockets = _.filter(agentSockets, (x) => x.status == "ONLINE");
    if (!(agentSockets && agentSockets.length > 0)) {
      io.to(socket.id).emit(
        applicationconstants.chatactions.DEPARTMENTOFFLINE,
        applicationconstants.chatactionData.DEPARTMENTOFFLINE
      );
    } else {
      var availableAgentSockets = _.filter(
        agentSockets,
        (a) => a.assignedCustomerCount < a.threshold
      );
      if (!(availableAgentSockets && availableAgentSockets.length > 0)) {
        io.to(socket.id).emit(
          applicationconstants.chatactions.DEPARTMENTOFFLINE,
          applicationconstants.chatactionData.DEPARTMENTOFFLINE
        );
      } else {
        var agentwithlowestcount = _.min(availableAgentSockets, function(
          agent
        ) {
          return agent.assignedCustomerCount;
        });
        if (!agentwithlowestcount)
          io.to(socket.id).emit(
            applicationconstants.chatactions.DEPARTMENTOFFLINE,
            applicationconstants.chatactionData.DEPARTMENTOFFLINE
          );

        var customer = await customerService.saveCustomer(
          data.name,
          data.email,
          data.mobileNumber,
          data.departmentCode,
          data.channelCode
        );
        if (customer == null) return;

        await chatService.addConnectedCustomer(
          socket.id,
          sessionid,
          customer.customerId,
          data.name,
          data.email,
          data.mobileNumber
        );

        // await chatService.updateAgentCustomerCount(
        //   agentwithlowestcount.agentSessionId
        // );

        var chatPair = await chatService.addChatPair(
          agentwithlowestcount.agentSessionId,
          sessionid,
          agentwithlowestcount.agentId,
          customer.customerId,
          socket.handshake.address,
          data.departmentCode,
          data.channelCode
        );
        var welcomeMessage = aesWrapper.createAesMessage(
          `My Name is ${agentwithlowestcount.name ? agentwithlowestcount.name : ""}, how can I assist you today?`
        );
        io.to(agentwithlowestcount.socketId).emit(
          applicationconstants.chatactions.NEWUSERADDED,
          {
            customerSessionId: sessionid,
            customerId: customer.customerId,
            chatHistory: customer.history,
            chatId: chatPair.chatId,
            userDetails: {
              name: data.name || "",
              email: data.email || "",
              mobileNumber: data.mobileNumber || ""
            },
            welcomeMessage: welcomeMessage
          }
        );
        io.to(socket.id).emit(applicationconstants.chatactions.CONFIRMADDUSER, {
          customerSessionId: sessionid,
          chatId: chatPair.chatId,
          userDetails: {
            name: data.name || "",
            email: data.email || "",
            mobileNumber: data.mobileNumber || ""
          }
          // chatHistory: customer.history
        });
        var currentDate = new Date();
        var messageId = chatPair.customerSessionId + currentDate.getTime();
        var timeStamp = common.getFormattedUtcDate(currentDate);
        var welcomeChatInfo = await chatService.addUpdateChatHistory(
          chatPair.chatId,
          welcomeMessage,
          true,
          messageId,
          timeStamp,
          false
        );
        io.to(agentwithlowestcount.socketId).emit(
          applicationconstants.chatactions.CHATMESSAGE,
          {
            customerSessionId: sessionid,
            messageId: messageId,
            timeStamp: timeStamp,
            message: welcomeMessage,
            isAgent: true
          }
        );

        io.to(socket.id).emit(applicationconstants.chatactions.AGENTAVAILABLE, {
          message: welcomeMessage,
          chatHistory: {
            lastObjectId: welcomeChatInfo.lastObjectId,
            messages: []
          }
        });

        heartBeatTimer = setTimeout(async function() {
          var customerSessionId = sessionid;
          var connectedCustomer = await chatService.getConnectedCustomer(
            customerSessionId
          );
          //  if (!connectedCustomer) return
          var chatPair = await chatService.getActiveChatPair(customerSessionId);
          if (!chatPair) return;
          var connectedAgent = await chatService.getConnectedAgent(
            chatPair.agentSessionId
          );
          await chatService.terminateChat(
            connectedCustomer.customerSessionId,
            new Date()
          );

          if (connectedAgent) {
            await chatService.decreaseAgentCustomerCount(
              connectedAgent.agentSessionId
            );
            io.to(connectedAgent.socketId).emit(
              applicationconstants.chatactions.CUSTOMERDISCONNECTED,
              {
                customerSessionId: chatPair.customerSessionId
              }
            );
          }
          if (connectedCustomer) {
            io.to(connectedCustomer.socketId).emit(
              applicationconstants.chatactions.LOGOFF,
              {}
            );
          }
          await chatService.removeConnectedCustomer(customerSessionId);
        }, 1000 * 60 * chatPair.idleTimeout);
      }
    }
  });

  socket.on(applicationconstants.chatactions.LOGINAGENT, async function(data) {
    var agent = await agentService.getAgentById(data.agentId);
    var sessionid = uuid.v4();
    var removedAgentSessionId = await chatService.removeExistingAgentSession(
      agent.staffId
    );
    await chatService.addConnectedAgent(
      socket.id,
      sessionid,
      data.agentId,
      agent.chatThreshold,
      0,
      agent.departments,
      agent.email,
      agent.name,
      agent.staffId
    );
    socket.emit(applicationconstants.chatactions.LOGINSUCCESS, {
      agentSessionId: sessionid
    });

    if (!removedAgentSessionId) return;
    var connectedCustomers = await chatService.getAgentConnectedCustomers(
      removedAgentSessionId
    );
    if (connectedCustomers != null && connectedCustomers.length > 0) {
      for (let index = 0; index < connectedCustomers.length; index++) {
        const c = connectedCustomers[index];
        io.to(c.socketId).emit(applicationconstants.chatactions.LOGOFF, {});
        await chatService.terminateChat(c.customerSessionId, new Date());
        await chatService.removeConnectedCustomer(c.customerSessionId);
      }
    }
  });

  socket.on(
    applicationconstants.chatactions.INITIATETRANSFERCHAT,
    async function(data) {
      var departments = await chatService.getActiveDepartmentsForTransfer(
        data.agentSessionId
      );
      var agents = await chatService.getActiveAgentsForTransfer(
        data.agentSessionId
      );
      socket.emit(applicationconstants.chatactions.INITIATETRANSFERCHATACK, {
        availableDepartments: departments
          ? _.map(departments, (x) => {
            return { code: x.code, name: x.displayName };
          })
          : departments,
        availableAgents: agents
      });
    }
  );

  socket.on(applicationconstants.chatactions.TRANSFERCHAT, async function(
    data
  ) {
    var res = await chatService.transferAgentChat(
      data.customerSessionId,
      data.agentSessionId,
      data.transferAgentId
    );
    var connectedCustomer = await chatService.getConnectedCustomer(
      data.customerSessionId
    );
    if (res) {
      var chatPair = await chatService.getActiveChatPair(
        data.customerSessionId
      );
      var chatHistory = await chatService.getChatHistory({
        customerId: connectedCustomer.customerId,
        departmentCode: "",
        lastObjectId: "",
        chatId: chatPair.chatId,
        isAgent: true
      });

      io.to(res.TransferConnecteAgent.socketId).emit(
        applicationconstants.chatactions.NEWUSERTRANSFERRED,
        {
          customerSessionId: data.customerSessionId,
          userDetails: data.userDetails,
          customerId: connectedCustomer.customerId,
          chatHistory: chatHistory,
          chatId: chatPair.chatId
        }
        // transferredFrom: {
        //   // email: res.CurrentAgent.agent.user.email,
        //   // name: res.CurrentAgent.agent.name
        // }
      );
      socket.emit(applicationconstants.chatactions.TRANSFERSUCCESFUL, {
        customerSessionId: data.customerSessionId
      });
      var chatNote = aesWrapper.createAesMessage(
        "Your chat has been transferred"
      );
      io.to(connectedCustomer.socketId).emit(
        applicationconstants.chatactions.INAPPMESSAGE,
        {
          message: chatNote
        }
      );
      socket.emit(applicationconstants.chatactions.INAPPMESSAGE, {
        message: chatNote,
        customerSessionId: connectedCustomer.customerSessionId
      });
      var currentDate = new Date();
      await chatService.addUpdateChatHistory(
        chatPair.chatId,
        chatNote,
        true,
        chatPair.customerSessionId + currentDate.getTime(),
        common.getFormattedUtcDate(currentDate),
        true
      );
    }
  });

  socket.on(
    applicationconstants.chatactions.TRANSFERCHATTODEPARTMENT,
    async function(data) {
      var tranferAgent = await chatService.transferChatToDepartment(
        data.customerSessionId,
        data.agentSessionId,
        data.selectedDepartment
      );
      var connectedCustomer = await chatService.getConnectedCustomer(
        data.customerSessionId
      );

      if (tranferAgent) {
        var chatPair = await chatService.getActiveChatPair(
          data.customerSessionId
        );
        var chatHistory = await chatService.getChatHistory({
          customerId: connectedCustomer.customerId,
          departmentCode: "",
          lastObjectId: "",
          chatId: chatPair.chatId,
          isAgent: true
        });
        io.to(tranferAgent.adminwithLowestAssignedCustomer.socketId).emit(
          applicationconstants.chatactions.NEWUSERTRANSFERRED,
          {
            customerSessionId: data.customerSessionId,
            userDetails: data.userDetails,
            customerId: connectedCustomer.customerId,
            chatHistory: chatHistory,
            chatId: chatPair.chatId
          }
        );
        socket.emit(applicationconstants.chatactions.TRANSFERSUCCESFUL, {
          customerSessionId: data.customerSessionId
        });
        var connectedCustomer = await chatService.getConnectedCustomer(
          data.customerSessionId
        );
        var chatNote = aesWrapper.createAesMessage(
          "Your chat has been transferred"
        );
        io.to(connectedCustomer.socketId).emit(
          applicationconstants.chatactions.INAPPMESSAGE,
          { message: chatNote }
        );
        socket.emit(applicationconstants.chatactions.INAPPMESSAGE, {
          message: chatNote,
          customerSessionId: connectedCustomer.customerSessionId
        });
        var currentDate = new Date();
        await chatService.addUpdateChatHistory(
          chatPair.chatId,
          chatNote,
          true,
          chatPair.customerSessionId + currentDate.getTime(),
          common.getFormattedUtcDate(currentDate),
          true
        );
      }
    }
  );

  socket.on(applicationconstants.chatactions.TYPING, async function(data) {
    var chatPair = await chatService.getActiveChatPair(data.customerSessionId);
    if (!chatPair) return;
    var toid = data.isAgent
      ? await chatService.getConnectedCustomer(chatPair.customerSessionId)
      : await chatService.getConnectedAgent(chatPair.agentSessionId);
    if (toid) {
      io.to(toid.socketId).emit(applicationconstants.chatactions.TYPING, {
        isTyping: data.isTyping,
        isAgent: data.isAgent,
        customerSessionId: chatPair.customerSessionId
      });
    }
  });

  socket.on(applicationconstants.chatactions.RATECHAT, async function(data) {
    var chatPair = await chatService.getChatPair(data.customerSessionId);

    if (!chatPair) return;
    await chatService.rateChat(chatPair.customerSessionId, data.rating);

    // io.to(connectedAgent.socketId).emit(
    //   applicationconstants.chatactions.CONFIRMCLOSECHAT,
    //   {
    //     customerSessionId: data.customerSessionId
    //   }
    // );
    await chatService.removeConnectedCustomer(data.customerSessionId);
    //await chatService.decreaseAgentCustomerCount(chatPair.agentSessionId);
  });
  var logoffTimer;
  socket.on("disconnect", async function() {
    var isSocketAgent = await chatService.isSocketAgent(socket.id);
    if (isSocketAgent) {
      await broadCastAgentOnlineStatus(socket.id, false);
    } else {
      await broadCastCustomerOnlineStatus(socket.id, false);
    }

    logoffTimer = setTimeout(async function() {
      var isAgent = isSocketAgent;

      if (isAgent) {
        var connectedAgent = await chatService.getConnectedAgentBySocketId(
          socket.id
        );
        if (!connectedAgent) return;
        var connectedCustomers = await chatService.getAgentConnectedCustomers(
          connectedAgent.agentSessionId
        );
        if (connectedCustomers != null && connectedCustomers.length > 0) {
          for (let index = 0; index < connectedCustomers.length; index++) {
            const c = connectedCustomers[index];
            io.to(c.socketId).emit(applicationconstants.chatactions.LOGOFF, {});
            await chatService.terminateChat(c.customerSessionId, new Date());
            await chatService.removeConnectedCustomer(c.customerSessionId);
            if (!connectedAgent) return;
            await chatService.decreaseAgentCustomerCount(
              connectedAgent.agentSessionId
            );
          }
        }
      } else {
        var connectedCustomer = await chatService.getConnectedCustomerBySocketId(
          socket.id
        );
        if (!connectedCustomer) return;
        var chatPair = await chatService.getActiveChatPair(
          connectedCustomer.customerSessionId
        );
        if (!chatPair) return;
        var connectedAgent = await chatService.getConnectedAgent(
          chatPair.agentSessionId
        );
        await chatService.terminateChat(
          connectedCustomer.customerSessionId,
          new Date()
        );
        await chatService.removeConnectedCustomerBySocketId(socket.id);
        if (!connectedAgent) return;
        await chatService.decreaseAgentCustomerCount(
          connectedAgent.agentSessionId
        );
        io.to(connectedAgent.socketId).emit(
          applicationconstants.chatactions.CUSTOMERDISCONNECTED,
          {
            customerSessionId: chatPair.customerSessionId
          }
        );
      }
      if (!isAgent) socket.disconnect(true);
    }, 1000 * 60 * 15);
  });

  socket.on(
    applicationconstants.chatactions.OFFLINEDATASUBMITTED,
    async function(
      data
      //,callback
    ) {
      await chatService.submitOfflineData(data);
      socket.emit(applicationconstants.chatactions.OFFLINEDATASUBMITTEDACK);
      //callback(null,true);
    }
  );

  socket.on(applicationconstants.chatactions.AGENTLOGOFF, async function(
    data
  ) {
    var connectedCustomers = await chatService.getAgentConnectedCustomers(
      data.agentSessionId
    );
    await chatService.removeConnectedAgent(data.agentSessionId);
    if (connectedCustomers != null && connectedCustomers.length > 0) {
      var clonedCustomers = connectedCustomers.slice(0);
      if (clonedCustomers != null && clonedCustomers.length > 0)
        for (let index = 0; index < clonedCustomers.length; index++) {
          const c = clonedCustomers[index];
          await chatService.terminateChat(c.customerSessionId, new Date());
          await chatService.removeConnectedCustomer(c.customerSessionId);
          io.to(c.socketId).emit(applicationconstants.chatactions.LOGOFF, {});
        }
    }
  });

  socket.on(applicationconstants.chatactions.UPLOAD, function(data) {
    fileHelper.uploadFileChunk(data).then(
      async function(fileUploadResult) {
        if (fileUploadResult.status == "DONE") {
          var chatPair = await chatService.getActiveChatPair(
            data.customerSessionId
          );
          if (!chatPair) return;
          if (!chatPair.agentSessionId) return;
          var customer = await chatService.getConnectedCustomer(
            data.customerSessionId
          );
          var agent = await chatService.getConnectedAgent(
            chatPair.agentSessionId
          );
          io.to(customer.socketId).emit(
            applicationconstants.chatactions.FILEUPLOADED,
            {
              customerSessionId: chatPair.customerSessionId,
              url: aesWrapper.createAesMessage(fileUploadResult.url),
              timeStamp: fileUploadResult.timeStamp,
              isAgent: data.isAgent,
              messageId: data.messageId,
              originalFileName: fileUploadResult.originalFileName
            }
          );
          io.to(agent.socketId).emit(
            applicationconstants.chatactions.FILEUPLOADED,
            {
              customerSessionId: chatPair.customerSessionId,
              url: aesWrapper.createAesMessage(fileUploadResult.url),
              timeStamp: fileUploadResult.timeStamp,
              isAgent: data.isAgent,
              messageId: data.messageId,
              originalFileName: fileUploadResult.originalFileName
            }
          );
          await chatService.addUpdateChatHistory(
            chatPair.chatId,
            aesWrapper.createAesMessage(fileUploadResult.url),
            data.isAgent,
            data.messageId,
            fileUploadResult.timeStamp,
            false,
            true,
            fileUploadResult.originalFileName
          );
        } else if (fileUploadResult.status == "PENDING") {
          socket.emit("moredata", {
            place: fileUploadResult.place,
            percent: fileUploadResult.percent,
            messageId: data.messageId,
            isAgent: data.isAgent
          });
        }
      },
      function(err) {
        console.log(err);
      }
    );
  });

  socket.on(applicationconstants.chatactions.STARTFILEUPLOAD, function(data) {
    if (fileHelper.validateFileData(data.name, data.size) == false) {
      socket.emit(applicationconstants.chatactions.INVALIDFILE, {
        messageId: data.messageId
      });
    }
    fileHelper.initiateFileUpload(data).then(
      function(fileUploadResult) {
        if (fileUploadResult.status == "PENDING") {
          socket.emit(applicationconstants.chatactions.MOREDATA, {
            place: fileUploadResult.place,
            percent: fileUploadResult.percent,
            messageId: data.messageId
          });
        }
      },
      function(err) {
        console.log(err);
      }
    );
  });

  socket.on(applicationconstants.chatactions.AGENTAWAY, async function(data) {
    try {
      await chatService.UpdateAgentStatus(data.agentSessionId, data.status);
    } catch (error) {
    }
  });

  socket.on(applicationconstants.chatactions.CLOSECHAT, async function(data) {
    var chatPair = await chatService.getActiveChatPair(data.customerSessionId);
    var connectedCutomer = await chatService.getConnectedCustomer(
      data.customerSessionId
    );
    data.message = aesWrapper.createAesMessage(
      data.markAsDone
        ? "Chat has been marked as done"
        : "Agent has ended the chat "
    );

    if (chatPair) {
      await chatService.initiateCloseOrMarkAsDone(
        data.markAsDone,
        chatPair.customerSessionId
      );
      if (connectedCutomer) {
        io.to(connectedCutomer.socketId).emit(
          applicationconstants.chatactions.CLOSECHAT,
          data
        );
      }
    }
    await chatService.decreaseAgentCustomerCount(chatPair.agentSessionId);
  });

  socket.on(
    applicationconstants.chatactions.FETCHUNRECEIVEDMESSAGES,
    async function(data) {
      var unreceivedMessages = await chatService.fetchUnReceivedMessages(
        data.isAgent,
        data.messageId
      );
      socket.emit(applicationconstants.chatactions.UNRECEIVEDMESSAGES, {
        messages: unreceivedMessages,
        customerSessionId: data.customerSessionId
      });
    }
  );

  socket.on(applicationconstants.chatactions.FETCHCHATHISTORY, async function(
    data
  ) {
    var chatPair = await chatService.getActiveChatPair(data.customerSessionId);
    var connectedCustomer = await chatService.getConnectedCustomer(
      data.customerSessionId
    );
    if (!connectedCustomer) return;
    var chatHistory = await chatService.getChatHistory({
      lastObjectId: data.lastObjectId,
      customerId: connectedCustomer.customerId,
      chatId: chatPair.chatId,
      isAgent: data.isAgent
    });
    socket.emit(applicationconstants.chatactions.CHATHISTORY, {
      history: chatHistory
    });
  });
});

// start server
const port = process.env.SERVER_PORT;
server.listen(port, function() {
  console.log("Server listening on port " + port);
});
