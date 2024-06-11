//During the test the env variable is set to test
// const bcrypt = require("bcryptjs");

var importValue = require('./migration.integration.test');
//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
let server = require("../../api");
// const mongoose = require("mongoose");
// const should = chai.should();
const expect = chai.expect;
//mongoose.Promise=global.Promise;
chai.use(chaiHttp);
var token,userid;




    

describe("Chat", () => {
  it("should login user", done => {
    const user = {
      staffId: "my0001",
      password: "Password",
      sourcePortal: "AGENT"
    };
    chai
      .request(server)
      .post("/api/login")
      .send(user)
      .end((err, res) => {
        expect(res).to.be.json;
        token = res.body.token;
        userid = res.body.id;
        resetpasswordUserId = res.body.id
        res.should.have.status(200);
      //   module.exports.dd=token;
      //   console.log("first"+module.exports.dd);
        done();
      });
  });
  describe("/api/chat/saveChat", () => {
    

    it("should return 401 Unauthorized", done => {
      
      const reqBody = {
        agentId:userid,
        agentSessionId:"5c9c5b2c78866a8458170633",
        customerId:importValue.customer_Id,
        customerSessionId:"5c9c5b2c78866a8458170456",
        startTime:"1553954655",
        requestIP:"::1",
        channelCode:"WEB",
        department:importValue.department_Id,
        departmentCode:importValue.department_Code
      };
    
  
      chai
        .request(server)
        .post("/api/chat/saveChat")
        .send(reqBody)
       // .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(401);
          done();
        });
    });
  
    it("should return 200", done => {
    
      const reqBody = {
        agentId:userid,
        agentSessionId:"5c9c5b2c78866a8458170633",
        customerId:importValue.customer_Id,
        customerSessionId:"5c9c5b2c78866a8458170456",
        startTime:"1553954655",
        requestIP:"::1",
        channelCode:"WEB",
        department:importValue.department_Id,
        departmentCode:importValue.department_Code
      };
    
  
      chai
        .request(server)
        .post("/api/chat/saveChat")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(200);
          done();
        });
    });
  
    it("Department/Agent/Customer not found", done => {
      const reqBody = {
        agentId:"5c9c5b2c78866a8458170633",//fault Agent Id
        agentSessionId:"5c9c5b2c78866a8458170633",
        customerId:importValue.customer_Id,
        customerSessionId:"5c9c5b2c78866a8458170456",
        startTime:"1553954655",
        requestIP:"::1",
        channelCode:"WEB",
        departmentCode:importValue.department_Code
      };
  
      chai
        .request(server)
        .post("/api/chat/saveChat")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(400);
          done();
        });
    });
    it("Department/Agent/Customer not found", done => {
      const reqBody = {
        agentId:userid,
        agentSessionId:"5c9c5b2c78866a8458170633",
        customerId:"5c9c5b2c78866a8458170633",//Fault customer Id
        customerSessionId:"5c9c5b2c78866a8458170456",
        startTime:"1553954655",
        requestIP:"::1",
        channelCode:"WEB",
        departmentCode:importValue.department_Code
      };
  
      chai
        .request(server)
        .post("/api/chat/saveChat")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(400);
          done();
        });
    });
    it("Department/Agent/Customer not found", done => {
      const reqBody = {
        agentId:userid,
        agentSessionId:"5c9c5b2c78866a8458170633",
        customerId:importValue.customer_Id,
        customerSessionId:"5c9c5b2c78866a8458170456",
        startTime:"1553954655",
        requestIP:"::1",
        channelCode:"WEB",
        departmentCode:"FaultDepartMentCode" //Fault Department Code
      };
  
      chai
        .request(server)
        .post("/api/chat/saveChat")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          //expect(res).to.be.json;
          res.should.have.status(400);
          done();
        });
    });
  
    it("agentId is required", done => {//Request without Agent Id
      const reqBody = {
    
        agentSessionId:"5c9c5b2c78866a8458170633",
        customerId:importValue.customer_Id,
        customerSessionId:"5c9c5b2c78866a8458170456",
        startTime:"1553954655",
        requestIP:"::1",
        channelCode:"WEB",
        departmentCode:"FaultDepartMentCode" 
      };
  
      chai
        .request(server)
        .post("/api/chat/saveChat")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          //expect(res).to.be.json;
          res.should.have.status(422);
          done();
        });
    });
    it("customerId is required", done => {//Request without Customer Id
      const reqBody = {
        agentId:userid,
        agentSessionId:"5c9c5b2c78866a8458170633",
  
        customerSessionId:"5c9c5b2c78866a8458170456",
        startTime:"1553954655",
        requestIP:"::1",
        channelCode:"WEB",
        departmentCode:"FaultDepartMentCode" 
      };
  
      chai
        .request(server)
        .post("/api/chat/saveChat")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          //expect(res).to.be.json;
          res.should.have.status(422);
          done();
        });
    });
    it("agentId is required // customerId is required // departmentCode is required", done => {//Request without Customer Id/agentId/departmntCode
      const reqBody = {
       
        agentSessionId:"5c9c5b2c78866a8458170633",
  
        customerSessionId:"5c9c5b2c78866a8458170456",
        startTime:"1553954655",
        requestIP:"::1",
        channelCode:"WEB",
    
      };
  
      chai
        .request(server)
        .post("/api/chat/saveChat")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          //expect(res).to.be.json;
          res.should.have.status(422);
          done();
        });
    });
    it("agentId must be a string", done => { //null agentId
      const reqBody = {
        agentId:null,
        agentSessionId:"5c9c5b2c78866a8458170633",
        customerId:importValue.customer_Id,
        customerSessionId:"5c9c5b2c78866a8458170456",
        startTime:"1553954655",
        requestIP:"::1",
        channelCode:"WEB",
        departmentCode:"FaultDepartMentCode" //Fault Department Code
      };
  
      chai
        .request(server)
        .post("/api/chat/saveChat")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          //expect(res).to.be.json;
          res.should.have.status(422);
          done();
        });
    });
    it("agentId is not allowed to be empty", done => { //null agentId
      const reqBody = {
        agentId:"",
        agentSessionId:"5c9c5b2c78866a8458170633",
        customerId:importValue.customer_Id,
        customerSessionId:"5c9c5b2c78866a8458170456",
        startTime:"1553954655",
        requestIP:"::1",
        channelCode:"WEB",
        departmentCode:"FaultDepartMentCode" //Fault Department Code
      };
  
      chai
        .request(server)
        .post("/api/chat/saveChat")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          //expect(res).to.be.json;
          res.should.have.status(422);
          done();
        });
    });
  
   
  
  });
  describe("/api/chat/updateChat", () => {
  
    it("should return 401 Unauthorized", done => {
      const reqBody = {
        chatId:importValue.chat_Id,
        endTime:"1553954655",
        rating:5,
        status:"DJJJJJone"
      };
  
      chai
        .request(server)
        .post("/api/chat/updateChat")
        .send(reqBody)
      //  .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(401);
          done();
        });
    });
    
    it("should return 200", done => {
      const reqBody = {
        chatId:importValue.chat_Id,
        endTime:"1553954655",
        rating:5,
        status:"DJJJJJone"
      };
  
      chai
        .request(server)
        .post("/api/chat/updateChat")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(200);
          done();
        });
    });
      
    it("invalid chatId!", done => {
      const reqBody = {
        chatId:"5cc68f4fecc5663bf58b1815",//Invalid Chat Id
        endTime:"1553954655",
        rating:5,
        status:"Done"
      };
  
      chai
        .request(server)
        .post("/api/chat/updateChat")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(400);
          done();
        });
    });
    it("invalid chatId!", done => {
      const reqBody = {
        chatId:"5cc68f4fecc5663bf58b1815",//Invalid Chat Id
        endTime:"1553954655",
        rating:5,
        status:"Done"
      };
  
      chai
        .request(server)
        .post("/api/chat/updateChat")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(400);
          done();
        });
    });
    it("endTime is required // rating is required // status is required", done => { //Request without endTime,rating and status
      const reqBody = {
        chatId:importValue.chat_Id, 
      };
  
      chai
        .request(server)
        .post("/api/chat/updateChat")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(422);
          done();
        });
    });
    it("endTime must be a number of milliseconds or valid date string // rating must be a number // status must be a string", done => { //Request with endTime,rating and status null
    const reqBody = {
      chatId:importValue.chat_Id, 
  
      endTime:null,
      rating:null,
      status:null
    };
  
    chai
      .request(server)
      .post("/api/chat/updateChat")
      .send(reqBody)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.be.json;
        res.should.have.status(422);
        done();
      });
  });
  it("endTime must be a number of milliseconds or valid date string // rating must be a number // status is not allowed to be empty", done => { //Request with endTime,rating and status empty string
  const reqBody = {
    chatId:importValue.chat_Id, 
  
    endTime:"",
    rating:"",
    status:""
  };
  
  chai
    .request(server)
    .post("/api/chat/updateChat")
    .send(reqBody)
    .set("Authorization", `Bearer ${token}`)
    .end((err, res) => {
      expect(res).to.be.json;
      res.should.have.status(422);
      done();
    });
  });
  
  });
  
  describe("/api/chat/getChatHistory", () => {
   
    it("should return 401 Unauthorized", done => {
   
      const reqBody = {
        customerId:importValue.customer_Id,
        pageNo:1,
        size:10,
        departmentCode:"TESTUPDATE"
      };
  
      chai
        .request(server)
        .post("/api/chat/getChatHistory")
        .send(reqBody)
       // .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(401);
          done();
        });
    });
    it("should return 200", done => {
   
      const reqBody = {
        customerId:importValue.customer_Id,
        pageNo:1,
        size:10,
        departmentCode:"TESTUPDATE"
      };
  
      chai
        .request(server)
        .post("/api/chat/getChatHistory")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(200);
          done();
        });
    });
    it("invalid page number, should start with 1", done => {
     // console.log(customerId);
      const reqBody = {
        customerId:importValue.customer_Id,
        pageNo:0,
        size:10,
        departmentCode:"TESTUPDATE"
      };
  
      chai
        .request(server)
        .post("/api/chat/getChatHistory")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(400);
          done();
        });
    });
  });
  
  describe("/api/chat/saveBulkChatHistory", () => {
   
    it("should return 401 Unauthorized", done => {
     
      const reqBody = {
        messages: [
          {
          chatId: importValue.chat_Id,
          agentId:userid,
          customerId:importValue.customer_Id,
          departmentCode: importValue.department_Code,
          isAgentChat: false,
          timeStamp: "1553954655",
          message: "hello agent"
        },
        {
          chatId: importValue.chat_Id,
          agentId:userid,
          customerId:importValue.customer_Id,
          departmentCode: importValue.department_Code,
          isAgentChat: true,
          timeStamp: "1553954655",
          message: "hello customer"
        },
        {
          chatId: importValue.chat_Id,
          agentId:userid,
          customerId:importValue.customer_Id,
          departmentCode: importValue.department_Code,
          isAgentChat: false,
          timeStamp: "1553954655",
          message: "hello agent"
        },
        
        {
          chatId: importValue.chat_Id,
          agentId:userid,
          customerId:importValue.customer_Id,
          departmentCode: importValue.department_Code,
          isAgentChat: true,
          timeStamp: "1553954655",
          message: "hello customer"
        }
  
      ]
      };
  
      chai
        .request(server)
        .post("/api/chat/saveBulkChatHistory")
        .send(reqBody)
      //  .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(401);
          done();
        });
    });
    it("should return 200", done => {
      // console.log(customerId);
      // console.log(userid);
      // console.log(chatId);
      const reqBody = {
        messages: [
          {
          chatId: importValue.chat_Id,
          agentId:userid,
          customerId:importValue.customer_Id,
          departmentCode: importValue.department_Code,
          isAgentChat: false,
          timeStamp: "1553954655",
          message: "hello agent"
        },
        {
          chatId: importValue.chat_Id,
          agentId:userid,
          customerId:importValue.customer_Id,
          departmentCode: importValue.department_Code,
          isAgentChat: true,
          timeStamp: "1553954655",
          message: "hello customer"
        },
        {
          chatId: importValue.chat_Id,
          agentId:userid,
          customerId:importValue.customer_Id,
          departmentCode: importValue.department_Code,
          isAgentChat: false,
          timeStamp: "1553954655",
          message: "hello agent"
        },
        
        {
          chatId: importValue.chat_Id,
          agentId:userid,
          customerId:importValue.customer_Id,
          departmentCode: importValue.department_Code,
          isAgentChat: true,
          timeStamp: "1553954655",
          message: "hello customer"
        }
  
      ]
      };
  
      chai
        .request(server)
        .post("/api/chat/saveBulkChatHistory")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(200);
          done();
        });
    });
  
  
    it("should return 200", done => {
      // console.log(customerId);
      // console.log(userid);
      // console.log(chatId);
      var data=[];
     for(var i=0;i<478;i++)
     {
      data.push(
        {
          chatId: importValue.chat_Id,
          agentId:userid,
          customerId:importValue.customer_Id,
          departmentCode: importValue.department_Code,
          isAgentChat: false,
          timeStamp: "1553954655",
          message: "hello agent"
        }
      )
     }
      const reqBody = {
        messages: data
         
      
      };
  //console.log(data);
      chai
        .request(server)
        .post("/api/chat/saveBulkChatHistory")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(200);
          done();
        });
    });
  
    it("should return 200", done => {
      // console.log(customerId);
      // console.log(userid);
      // console.log(chatId);
      var data=[];
     for(var i=0;i<999;i++)
     {
      data.push(
        {
          chatId: importValue.chat_Id,
          agentId:userid,
          customerId:importValue.customer_Id,
          departmentCode: importValue.department_Code,
          isAgentChat: false,
          timeStamp: "1553954655",
          message: "hello agent"
        }
      )
     }
      const reqBody = {
        messages: data
         
      
      };
  //console.log(data);
      chai
        .request(server)
        .post("/api/chat/saveBulkChatHistory")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(200);
          done();
        });
    });
  
    it("Invalid customerId or agentId or chatId", done => {
      // console.log(customerId);
      // console.log(userid);
      // console.log(chatId);
      const reqBody = {
        messages: [
          {
          chatId: userid,
          agentId:userid,
          customerId:importValue.customer_Id,
          departmentCode: "TESTUPDATE",
          isAgentChat: false,
          timeStamp: "1553954655",
          message: "hello agent"
        },
        {
          chatId: importValue.chat_Id,
          agentId:userid,
          customerId:importValue.customer_Id,
          departmentCode: "TESTUPDATE",
          isAgentChat: true,
          timeStamp: "1553954655",
          message: "hello customer"
        },
        {
          chatId: importValue.chat_Id,
          agentId:userid,
          customerId:importValue.customer_Id,
          departmentCode: "TESTUPDATE",
          isAgentChat: false,
          timeStamp: "1553954655",
          message: "hello agent"
        },
        
        {
          chatId: importValue.chat_Id,
          agentId:importValue.chat_Id,
          customerId:importValue.customer_Id,
          departmentCode: "TESTUPDATE",
          isAgentChat: true,
          timeStamp: "1553954655",
          message: "hello customer"
        }
  
      ]
      };
  
      chai
        .request(server)
        .post("/api/chat/saveBulkChatHistory")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          //expect(res).to.be.json;
          res.should.have.status(400);
          done();
        });
    });
  
    it("Invalid customerId or agentId or chatId", done => {
      // console.log(customerId);
      // console.log(userid);
      // console.log(chatId);
      const reqBody = {
        messages: [
          {
          chatId: importValue.chat_Id,
          agentId:userid,
          customerId:importValue.customer_Id,
          departmentCode: "TESTUPDATE",
          isAgentChat: false,
          timeStamp: "1553954655",
          message: "hello agent"
        },
        {
          chatId: userid,
          agentId:userid,
          customerId:userid,
          departmentCode: "TESTUPDATE",
          isAgentChat: true,
          timeStamp: "1553954655",
          message: "hello customer"
        },
        {
          chatId: importValue.chat_Id,
          agentId:userid,
          customerId:userid,
          departmentCode: "TESTUPDATE",
          isAgentChat: false,
          timeStamp: "1553954655",
          message: "hello agent"
        },
        
        {
          chatId: importValue.chat_Id,
          agentId:importValue.chat_Id,
          customerId:importValue.customer_Id,
          departmentCode: "TESTUPDATE",
          isAgentChat: true,
          timeStamp: "1553954655",
          message: "hello customer"
        }
  
      ]
      };
  
      chai
        .request(server)
        .post("/api/chat/saveBulkChatHistory")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(400);
          done();
        });
    });
  
  });
  
  describe("/api/chat/datatable", () => {
   
    it("should return 401 Unauthorized", done => {
      
      const reqBody = {
        take: 10,
        skip: 0,
        sort: [{
          field: "startTime",
          dir: "asc"
        }],
        filter: {
          logic: "and",
          filters: []
        }
      };
  
      chai
        .request(server)
        .post("/api/chat/datatable")
        .send(reqBody)
       // .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(401);
          done();
        });
    });
    it("should return 200", done => {
      
      const reqBody = {
        take: 10,
        skip: 0,
        sort: [{
          field: "startTime",
          dir: "asc"
        }],
        filter: {
          logic: "and",
          filters: []
        }
      };
  
      chai
        .request(server)
        .post("/api/chat/datatable")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(200);
          done();
        });
    });
    it("should return 200-take 2", done => {
      
      const reqBody = {
        take: 2,
        skip: 0,
        sort: [{
          field: "startTime",
          dir: "asc"
        }],
        filter: {
          logic: "and",
          filters: []
        }
      };
  
      chai
        .request(server)
        .post("/api/chat/datatable")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(200);
          expect(Object.keys(res.body.data)).to.have.length(2);
          done();
        });
    });

  });
  
  describe("/api/chat/saveChatHistory", () => {
    

    it("should return 401 Unauthorized", done => {
      
      const reqBody = {
        agentId:userid,
        agentSessionId:"5c9c5b2c78866a8458170633",
        customerId:importValue.customer_Id,
        customerSessionId:"5c9c5b2c78866a8458170456",
        startTime:"1553954655",
        requestIP:"::1",
        channelCode:"WEB",
        department:importValue.department_Id,
        departmentCode:importValue.department_Code
      };
    
  
      chai
        .request(server)
        .post("/api/chat/saveChatHistory")
        .send(reqBody)
       // .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(401);
          done();
        });
    });
  
    it("should return 200", done => {
    
      const reqBody = {
       
        chatId: importValue.chat_Id,
        agentId:userid,
        customerId:importValue.customer_Id,
        timeStamp:"1553954655",
        message:"test admin",
        isAgentChat:true,
        departmentCode: importValue.department_Code
      };
    
  
      chai
        .request(server)
        .post("/api/chat/saveChatHistory")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(200);
          done();
        });
    });

    it("Invalid customerId or agentId or chatId(400)", done => {
    
      const reqBody = {
       
        chatId: "5ccfff78b2d9a8c4589d00dc",
        agentId:userid,
        customerId:importValue.customer_Id,
        timeStamp:"1553954655",
        message:"test admin",
        isAgentChat:true,
        departmentCode: importValue.department_Code
      };
    
  
      chai
        .request(server)
        .post("/api/chat/saveChatHistory")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(400);
          done();
        });
    });
    it("Invalid customerId or agentId or chatId(400)", done => {
    
      const reqBody = {
       
        chatId: importValue.chat_Id,
        agentId:"5ccfff78b2d9a8c4589d00dc",
        customerId:importValue.customer_Id,
        timeStamp:"1553954655",
        message:"test admin",
        isAgentChat:true,
        departmentCode: importValue.department_Code
      };
    
  
      chai
        .request(server)
        .post("/api/chat/saveChatHistory")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(400);
          done();
        });
    });
    it("Invalid customerId or agentId or chatId(400)", done => {
    
      const reqBody = {
       
        chatId: importValue.chat_Id,
        agentId:importValue.chat_Id,
        customerId:"5ccfff78b2d9a8c4589d00dc",
        timeStamp:"1553954655",
        message:"test admin",
        isAgentChat:true,
        departmentCode: importValue.department_Code
      };
    
  
      chai
        .request(server)
        .post("/api/chat/saveChatHistory")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(400);
          done();
        });
    });
    it("Department Code is not Valid!(422)", done => {
    
      const reqBody = {
       
        chatId:importValue.chat_Id,
        agentId:importValue.userid,
        customerId:importValue.customer_Id,
        timeStamp:"1553954655",
        message:"test admin",
        isAgentChat:true,
        departmentCode: "GGG"
      };
    
  
      chai
        .request(server)
        .post("/api/chat/saveChatHistory")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(422);
          done();
        });
    });
    it("chatId must be a string(422)", done => {
    
      const reqBody = {
       
        chatId: null,
        agentId:userid,
        customerId:importValue.customer_Id,
        timeStamp:"1553954655",
        message:"test admin",
        isAgentChat:true,
        departmentCode: importValue.department_Code
      };
    
  
      chai
        .request(server)
        .post("/api/chat/saveChatHistory")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(422);
          done();
        });
    });

    it("chatId is not allowed to be empty(422)", done => {
    
      const reqBody = {
       
        chatId: "",
        agentId:userid,
        customerId:importValue.customer_Id,
        timeStamp:"1553954655",
        message:"test admin",
        isAgentChat:true,
        departmentCode: importValue.department_Code
      };
    
  
      chai
        .request(server)
        .post("/api/chat/saveChatHistory")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(422);
          done();
        });
    });
    it("agentId must be a string(422)", done => {
    
      const reqBody = {
       
        chatId: importValue.chat_Id,
        agentId:null,
        customerId:importValue.customer_Id,
        timeStamp:"1553954655",
        message:"test admin",
        isAgentChat:true,
        departmentCode: importValue.department_Code
      };
    
  
      chai
        .request(server)
        .post("/api/chat/saveChatHistory")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(422);
          done();
        });
    });

    it("agentId is not allowed to be empty(422)", done => {
    
      const reqBody = {
       
        chatId: importValue.chat_Id,
        agentId:"",
        customerId:importValue.customer_Id,
        timeStamp:"1553954655",
        message:"test admin",
        isAgentChat:true,
        departmentCode: importValue.department_Code
      };
    
  
      chai
        .request(server)
        .post("/api/chat/saveChatHistory")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(422);
          done();
        });
    });
    it("customerId must be a string(422)", done => {
    
      const reqBody = {
       
        chatId: importValue.chat_Id,
        agentId:importValue.agentId,
        customerId:null,
        timeStamp:"1553954655",
        message:"test admin",
        isAgentChat:true,
        departmentCode: importValue.department_Code
      };
    
  
      chai
        .request(server)
        .post("/api/chat/saveChatHistory")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(422);
          done();
        });
    });

    it("customerId is not allowed to be empty(422)", done => {
    
      const reqBody = {
       
        chatId: importValue.chat_Id,
        agentId:importValue.agentId,
        customerId:"",
        timeStamp:"1553954655",
        message:"test admin",
        isAgentChat:true,
        departmentCode: importValue.department_Code
      };
    
  
      chai
        .request(server)
        .post("/api/chat/saveChatHistory")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(422);
          done();
        });
    });

    it("departmentCode must be a string(422)", done => {
    
      const reqBody = {
       
        chatId: importValue.chat_Id,
        agentId:importValue.agentId,
        customerId:importValue.customer_Id,
        timeStamp:"1553954655",
        message:"test admin",
        isAgentChat:true,
        departmentCode: null
      };
    
  
      chai
        .request(server)
        .post("/api/chat/saveChatHistory")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(422);
          done();
        });
    });

    it("departmentCode is not allowed to be empty(422)", done => {
    
      const reqBody = {
       
        chatId: importValue.chat_Id,
        agentId:importValue.agentId,
        customerId:importValue.customer_Id,
        timeStamp:"1553954655",
        message:"test admin",
        isAgentChat:true,
        departmentCode: ""
      };
    
  
      chai
        .request(server)
        .post("/api/chat/saveChatHistory")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(422);
          done();
        });
    });
  
  
 
  
   
  
  });
  
  });

