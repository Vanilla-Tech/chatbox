var uuid = require("node-uuid");

var fs = require("fs");
var fileRootDir = "./temp/";
var files = {};
var fileStatus = {
  PENDING: "PENDING",
  DONE: "DONE",
  HOLD: "HOLD"
};

function validateFileData(fileName, fileSize) {
  var sFileExtension = fileName
    .split(".")
    [fileName.split(".").length - 1].toLowerCase();
  if (
    (!(
      sFileExtension === "jpeg" ||
      sFileExtension === "jpg" ||
      sFileExtension === "png" ||
      sFileExtension === "fig" ||
      sFileExtension === "tiff" ||
      sFileExtension === "psd" ||
      sFileExtension === "eps" ||
      sFileExtension === "ai" ||
      sFileExtension === "indd" ||
      sFileExtension === "raw" ||
      sFileExtension === "pdf" ||
      sFileExtension === "doc" ||
      sFileExtension === "docx"
    ) || fileSize > 5,
    242,
    880)
  ) {
    /// 10 mb
    return false;
  }
  return true;
}

function createIfNotExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return dir;
}
function initiateTodaysDirectory() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  var formattedDate = dd.toString() + mm.toString() + yyyy.toString();
  return createIfNotExists(fileRootDir + formattedDate);
}
function getSystemGeneratedFileName(fileName) {
  return uuid.v4() + "." + fileName.split(".").pop();
}

function uploadFileChunk(data) {
  return new Promise((res, rej) => {
    var key = data.messageId;
    files[key]["downloaded"] += data["data"].length;

    files[key]["data"] += data["data"];
    if (files[key]["downloaded"] == files[key]["size"]) {
      //If File is Fully Uploaded
      fs.write(
        files[key]["handler"],
        files[key]["data"],
        null,
        "Binary",
        function(err, Writen) {
          res({
            timestamp: files[key]["timestamp"],
            status: fileStatus.DONE,
            originalFileName: files[key]["originalFileName"],
            url:
              process.env.SERVER_URI +
              files[key]["filePath"].replace("./temp", "")
          });
        }
      );
    } else if (files[key]["data"].length > 10485760) {
      //If the Data Buffer reaches 10MB
      fs.write(
        files[key]["handler"],
        files[key]["data"],
        null,
        "Binary",
        function(err, Writen) {
          files[key]["data"] = ""; //Reset The Buffer
          var place = files[key]["downloaded"] / 524288;
          var percent = (files[key]["downloaded"] / files[key]["size"]) * 100;
          res({ status: fileStatus.PENDING, place: place, percent: percent });
          //socket.emit('MoreData', { 'Place' : Place, 'Percent' :  Percent});
        }
      );
    } else {
      var place = files[key]["downloaded"] / 524288;
      var percent = (files[key]["downloaded"] / files[key]["size"]) * 100;
      res({ status: fileStatus.PENDING, place: place, percent: percent });
      //socket.emit('MoreData', { 'Place' : Place, 'Percent' :  Percent});
    }
  });
}
function initiateFileUpload(data) {
  return new Promise((resolve, reject) => {
    var originalFileName = data.name;
    var fileName = getSystemGeneratedFileName(data.name);

    var messageId = data.messageId;
    var customerSessionId = data.customerSessionId;
    var agentSessionId = data.agentSessionId;
    var isAgent = data.isAgent;
    var fileDirectory = initiateTodaysDirectory();
    var currentFilePath = fileDirectory + "/" + fileName;
    files[messageId] = {
      //Create a new Entry in The files Variable
      size: data.size,
      name: fileName,
      originalFileName: originalFileName,
      customerSessionId: customerSessionId,
      agentSessionId: agentSessionId,
      isAgent: isAgent,
      data: "",
      downloaded: 0,
      timestamp: data.timestamp,
      filePath: currentFilePath
    };
    var place = 0;
    try {
      var stat = fs.statSync(currentFilePath);
      if (stat.isFile()) {
        files[messageId]["downloaded"] = stat.size;
        place = stat.size / 524288;
      }
      resolve(fileStatus.HOLD);
    } catch (er) {} //It's a New File
    fs.open(currentFilePath, "a", 0755, function(err, fd) {
      if (err) {
        resolve({ status: fileStatus.HOLD });
      } else {
        files[messageId]["handler"] = fd;
        resolve({ status: fileStatus.PENDING, place: place, percent: 0 });
        // socket.emit('MoreData', { 'Place' : Place, Percent : 0 });
      }
    });
  });
}
module.exports = {
  initiateFileUpload: initiateFileUpload,
  uploadFileChunk: uploadFileChunk,
  validateFileData: validateFileData
};
