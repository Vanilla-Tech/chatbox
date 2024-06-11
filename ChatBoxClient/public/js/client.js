// Initialize variables

var $window = $(window);
var $ratingArea = $(".ratingArea");
var $messages = $(".messages"); //Message area
var $inputMessage = $(".inputMessage"); //Text area to input msg
var $nameInput = $(".nameInput"); //Name input
var $phoneInput = $(".phoneInput"); //Phone number input
var $emailInput = $(".emailInput"); //Email input
var $form = $(".formArea"); // Details form
var $ratingForm = $(".ratingForm");
var $ratingArea = $(".ratingArea");
var $widgetBox = $(".contentArea"); //Widget box
var $Input = $(".inputFields"); //Input fields in form
var $chatBox = $(".chatArea"); //Chat page after filling form
var $Typing = $(".typing"); //Typing notification
var $newMsg = $(".msg_push_new"); //Dummy to push new msgs
var $oldMsg = $(".msg_push_old"); //Dummy to push msg history
var $department = $("#department").val();
var $channel = $("#channel").val();
var showprechatform = true;
var socket = io.connect("http://localhost:3034");
var typing = false; //Boolean to check if user is typing
var timeout = undefined; //Timeout to monitor typing
var id = sessionStorage.getItem("sessionid"); //Room ID in localstorage
var refreshtracker = true;

function reinitializeSocketConnection() {
  if (socket) socket.close();
  socket = null;
  socket = io.connect("http://localhost:3034");
}

var addChatHistory = function(chatmsg, timestamp, isAgent) {
  var chatSession = sessionStorage.getItem(sessionStorage.getItem("sessionid"));
  var currentMessage = {
    message: chatmsg,
    timestamp: timestamp,
    isAgent: isAgent
  };
  if (chatSession) {
    var existingSessionObject = JSON.parse(chatSession);
    existingSessionObject.push(currentMessage);
    sessionStorage.setItem(
      sessionStorage.getItem("sessionid"),
      JSON.stringify(existingSessionObject)
    );
    return;
  }
  sessionStorage.setItem(
    sessionStorage.getItem("sessionid"),
    JSON.stringify([currentMessage])
  );
};
var getChatHistory = function() {
  var chatHistory = sessionStorage.getItem(sessionStorage.getItem("sessionid"));
  if (chatHistory) return _.sortBy(JSON.parse(chatHistory), x => x.timestamp);
  return [];
};

socket.emit(applicationconstants.chatactions.INITIALIZECHATBOX, {
  departmentCode: $department,
  channelCode: $channel
});
socket.on(applicationconstants.chatactions.POSTINITIALIZECHATBOX, function(
  data
) {
  initializechatform(data);
});
socket.on(applicationconstants.chatactions.AGENTONLINESTATUS, function(data) {
  $inputMessage.prop("disabled", !data.isOnline);
  if (data.isOnline) $inputMessage.prop("placeholder", "Type here...");
  else
    $inputMessage.prop("placeholder", "Please wait until we get back to you");
});
socket.on(applicationconstants.chatactions.AGENTAVAILABLE, function(data) {
  var time = "" + new Date();
  var sender = "msg_b";
  var $messageBodyDiv = $(
    '<div class="' +
      sender +
      '">' +
      data.message +
      '<span class="timestamp">' +
      time.toLocaleString().substr(15, 6) +
      "</span></div>"
  ).insertBefore($newMsg);
  $messages[0].scrollTop = $messages[0].scrollHeight;
  addChatHistory(data.message, time, true);
  // $inputMessage.prop('disabled', true);
  // $inputMessage.prop('placeholder', "Please wait until we get back to you");
});

socket.on(applicationconstants.chatactions.LOGOFF, function(data) {
  resetChatBox();
});
function resetChatBox() {
  var sessionid = sessionStorage.getItem("sessionid");
  sessionStorage.removeItem("sessionid");
  sessionStorage.removeItem(sessionid);
  resetInputFields();
  socket.emit(applicationconstants.chatactions.INITIALIZECHATBOX, {
    departmentCode: $department,
    channelCode: $channel
  });
}
function resetInputFields() {
  $("input[type=text]").val("");
}
initializechatform = function(data) {
  showprechatform = data.showprechatform;
  if (showprechatform) {
    if (!data.isnamerequired) $nameInput.remove();
    if (!data.isemailrequired) $emailInput.remove();
    if (!data.isphonerequired) $phoneInput.remove();
    $form.show();
    $ratingArea.hide();
    $chatBox.hide();
  }
};

$(".msg_head").click(function() {
  $widgetBox.slideToggle("slow");
  if (sessionStorage.getItem("sessionid") != null) {
    if (refreshtracker) {
      //  socket.emit('refreshuser', {});
      loadHistory();
      refreshtracker = false;
      //return;
    }
    socket.emit(applicationconstants.chatactions.UPDATEUSER, {
      customerSessionId: sessionStorage.getItem("sessionid")
    });
    $form.hide();
    $ratingArea.hide();
    resetInputFields();
    $chatBox.show();
    $inputMessage.focus();
    $inputMessage.prop("disabled", false);
    $inputMessage.prop("placeholder", "Type here...");
  } else {
    if (!showprechatform)
      socket.emit(applicationconstants.chatactions.ADDUSER, {
        isNewUser: true,
        showprechatform: showprechatform,
        name: "",
        email: "",
        mobileNumber: "",
        departmentCode: $department,
        channelCode: $channel
      });
  }
});

$ratingForm.submit(function() {
  var rating = 0;
  customerSession = sessionStorage.getItem("sessionid");
  var object = $("input[name=rating]:checked");
  if (object && object.length > 0) rating = object.val();
  socket.emit(applicationconstants.chatactions.RATECHAT, {
    customerSessionId: sessionStorage.getItem("sessionid"),
    rating: rating
  });
  sessionStorage.removeItem("sessionid");
  sessionStorage.removeItem(customerSession);
  resetInputFields();
  $form.show();
  $chatBox.hide();
  $(".msg_b").remove();
  $(".msg_a").remove();
  reinitializeSocketConnection();
  $ratingArea.hide();
  return false;
});

$Input.submit(function() {
  socket.emit(applicationconstants.chatactions.ADDUSER, {
    isNewUser: true,
    showprechatform: showprechatform,
    name: $nameInput.val().trim(),
    email: $emailInput.val().trim(),
    mobileNumber: $phoneInput.val().trim(),
    departmentCode: $department,
    channelCode: $channel
  });
  return false;
});

socket.on(applicationconstants.chatactions.CONFIRMADDUSER, function(data) {
  sessionStorage.setItem("sessionid", data.customerSessionId);
  refreshtracker = false;
  $form.hide();
  $chatBox.show();
  $ratingArea.hide();
  $inputMessage.focus();
});

$inputMessage.keypress(function(event) {
  if (event.which !== 13) {
    if (typing === false && $inputMessage.is(":focus")) {
      typing = true;
      socket.emit("typing", {
        isTyping: true,
        customerSessionId: sessionStorage.getItem("sessionid"),
        isAgent: false
      });
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(timeoutFunction, 5000);
    }
  } else {
    sendMessage();
    clearTimeout(timeout);
    timeoutFunction();
  }
});

$messages.on("scroll", function() {
  if ($messages.scrollTop() == 0) socket.emit("more messages", {});
});
socket.on(applicationconstants.chatactions.NOAGENTSAVAILABLE, function(data) {
  if (!data.isFromUpdate) {
    var time = "" + new Date();
    var sender = "msg_b";
    var $messageBodyDiv = $(
      '<div class="' +
        sender +
        '">' +
        data.message +
        '<span class="timestamp">' +
        time.toLocaleString().substr(15, 6) +
        "</span></div>"
    ).insertBefore($newMsg);
    $messages[0].scrollTop = $messages[0].scrollHeight;
    addChatHistory(data.message, time, true);
  }
  $inputMessage.prop("disabled", true);
  $inputMessage.prop("placeholder", "Please wait until we get back to you");
});

socket.on(applicationconstants.chatactions.CHATMESSAGE, function(data) {
  var sender = "msg_b";
  if (data.isAgent) {
    var $messageBodyDiv = $(
      '<div class="' +
        sender +
        '">' +
        data.message +
        '<span class="timestamp">' +
        data.timestamp.toLocaleString().substr(15, 6) +
        "</span></div>"
    ).insertBefore($newMsg);
    $messages[0].scrollTop = $messages[0].scrollHeight;
    addChatHistory(data.message, data.timestamp, true);
  }
});

socket.on(applicationconstants.chatactions.TYPING, function(data) {
  if (data.isTyping && data.isAgent) $Typing.append("agent typing ..");
  else $Typing.text("");
});

socket.on(applicationconstants.chatactions.CHATHISTORY, function(data) {
  var len = data.history.length;
  for (var i = len - 1; i >= 0; i--) addMessages(data.history[i], false);
});

socket.on("more chat history", function(data) {
  var len = data.history.length;
  for (var i = 0; i < len; i++) addMessages(data.history[i], true);
});

socket.on("log message", function(text) {
  var time = "" + new Date();
  var $messageDiv = $(
    '<div class="msg_a">' +
      text +
      '<span class="timestamp">' +
      time.toLocaleString().substr(15, 6) +
      "</span></div>"
  ).insertBefore($newMsg);
  $messages[0].scrollTop = $messages[0].scrollHeight;
});

socket.on("disconnect", function() {
  $inputMessage.prop("disabled", true);
  $inputMessage.prop("placeholder", "Connection Lost! Reconnecting..");
});

socket.on("reconnect_failed", function() {
  $inputMessage.prop(
    "placeholder",
    "No active connection. Please refresh page."
  );
});
socket.on(applicationconstants.chatactions.CLOSECHAT, function(data) {
  $form.hide();
  $chatBox.hide();
  resetInputFields();
  $ratingArea.show();
});

socket.on("reconnect", function() {
  setTimeout(function() {
    $inputMessage.prop("disabled", false);
    $inputMessage.prop("placeholder", "Type here...");
    if (sessionStorage.getItem("sessionid")) {
      socket.emit(applicationconstants.chatactions.UPDATEUSER, {
        isNewUser: false,
        customerSessionId: sessionStorage.getItem("sessionid")
      });
      $inputMessage.prop("disabled", false);
      $inputMessage.prop("placeholder", "Type here...");
    } else {
      resetInputFields();
      $form.show();
      $chatBox.hide();
    }
  }, 4000);
});
socket.on("connect", function() {
  if (sessionStorage.getItem("sessionid"))
    socket.emit(applicationconstants.chatactions.UPDATEUSER, {
      isNewUser: false,
      customerSessionId: sessionStorage.getItem("sessionid")
    });
  else {
    resetInputFields();
    $form.show();
    $chatBox.hide();
  }
});

function timeoutFunction() {
  typing = false;
  socket.emit("typing", {
    isTyping: false,
    customerSessionId: sessionStorage.getItem("sessionid"),
    isAgent: false
  });
}

function sendMessage() {
  var message = $inputMessage.val();
  // Prevent markup from being injected into the message
  message = cleanInput(message);
  // if there is a non-empty message
  if (message) {
    $inputMessage.val("");
    var time = "" + new Date();
    // tell server to execute 'new message' and send along one parameter
    socket.emit(applicationconstants.chatactions.CHATMESSAGE, {
      customerSessionId: sessionStorage.getItem("sessionid"),
      isAgent: false,
      message: message,
      timestamp: time
    });
    var $messageBodyDiv = $(
      '<div class="msg_a">' +
        message +
        '<span class="timestamp">' +
        time.toLocaleString().substr(15, 6) +
        "</span></div>"
    ).insertBefore($newMsg);
    $messages[0].scrollTop = $messages[0].scrollHeight;
    addChatHistory(message, time, false);
  }
}
function loadHistory() {
  var chatHistory = getChatHistory();
  if (chatHistory && chatHistory.length > 0) {
    $.each(chatHistory, function(k, v) {
      addMessages(v);
    });
  }
}

function addMessages(data) {
  var sender;
  if (data.isAgent) sender = "msg_b";
  else sender = "msg_a";
  var $messageBodyDiv = $(
    '<div class="' +
      sender +
      '">' +
      data.message +
      '<span class="timestamp">' +
      data.timestamp.toLocaleString().substr(15, 6) +
      "</span></div>"
  );

  $messageBodyDiv.insertBefore($newMsg);
  $messages[0].scrollTop = $messages[0].scrollHeight;
}

// Prevents input from having injected markup
function cleanInput(input) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}
