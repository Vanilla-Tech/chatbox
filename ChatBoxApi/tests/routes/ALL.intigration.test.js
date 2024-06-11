// //During the test the env variable is set to test
// const bcrypt = require("bcryptjs");

// //Require the dev-dependencies
// const chai = require("chai");
// const chaiHttp = require("chai-http");
// let server = require("../../server");
// const mongoose = require("mongoose");
// const should = chai.should();
// const expect = chai.expect;
// //mongoose.Promise=global.Promise;
// const User = require("../../models/user");
// const Department = require("../../models/department");
// const Customer=require("../../models/customer");
// const Chats=require("../../models/chat");
// const ChatHistory=require("../../models/chatHistory");
// chai.use(chaiHttp);
// var token, userid, resetpasswordUserId,departmantId ,userIdWithoutDepartment,customerId,chatId,agentId;

// module.exports = {
//   ddd:"kllkjkl"


// };
// //Our parent block
// describe("User", () => {
//   before(async () => {
//     await Department.deleteMany();
//     await User.deleteMany();
//     await Customer.deleteMany();
//     await Chats.deleteMany();
//     await ChatHistory.deleteMany();
//     //beforeEach(async () => {
//       const department = new Department({
//         name: "Test Department",
//         code: "GASDGJ",
//         displayName: "Test Display Department",
//         openingDetails: [
//           {
//             day: "Monday",
//             openingTime: 400,
//             closingTime: 1080,
//             isActive: true
//           },
//           {
//             day: "Tuesday",
//             openingTime: 400,
//             closingTime: 1080,
//             isActive: true
//           },
//           {
//             day: "Wednesday",
//             openingTime: 400,
//             closingTime: 1080,
//             isActive: true
//           },
//           {
//             day: "Thursday",
//             openingTime: 400,
//             closingTime: 1080,
//             isActive: true
//           },
//           {
//             day: "Friday",
//             openingTime: 400,
//             closingTime: 1080,
//             isActive: true
//           },
//           {
//             day: "Saturday",
//             openingTime: 400,
//             closingTime: 1080,
//             isActive: true
//           },
//           {
//             day: "Sunday",
//             openingTime: 400,
//             closingTime: 1080,
//             isActive: true
//           }
//         ],
//         preChatForm: {
//           isRequired: true,
//           isEmailRequired: true,
//           isNameRequired: false,
//           isMobileNumberRequired: true
//         },
//         offlineForm: {
//           isRequired: true,
//           isEmailRequired: true,
//           isNameRequired: false,
//           isMobileNumberRequired: true
//         },
//         channels: [
//           {
//             code: "WEB"
//           }
//         ],
//         chatSetting: {
//           closeTime: 15,
//           uniqueIdentifier: "EMAIL"
//         },
//         offlineFormEmail: "chatbox@grr.la",
//         offlineFormMessage: "Test Message",
//         status: "ACTIVE",
//         isBlocked: false
//       });
//       department.save();
//      // console.log("Department"+department._id);
//      departmantId=department._id;
//       let user = new User({
//         name: "Test AgentNEW",
//         status: "Active",
//         staffId: "MY0001",
//         email: "test@test.com",
//         password: bcrypt.hashSync("Password", 10),
//         picture: "",
//         chatThreshold: 10,
//         type: "AGENT",
//         status: "APPROVED",
//         isBlocked: false,
//         forceChangePassword: false,
//         chatThreshold: 200,
//         departments: [
//           {
//             _id: department._id
//           }
//         ]
//       });
//       user.save();
//       agentId=user._id;
//       let userBlocked = new User({
//         name: "Test AgentBlocked",
//         status: "Active",
//         staffId: "MY0002",
//         email: "testblock@test.com",
//         password: bcrypt.hashSync("Password", 10),
//         picture: "",
//         chatThreshold: 10,
//         type: "AGENT",
//         status: "APPROVED",
//         isBlocked: true,
//         forceChangePassword: false,
//         chatThreshold: 200,
//         departments: [
//           {
//             _id:department._id
//           }
//         ]
//       });
//       userBlocked.save();
//       let userNotApproved = new User({
//         name: "Test Agentverified",
//         status: "Active",
//         staffId: "MY0003",
//         email: "testunapproved@test.com",
//         password: bcrypt.hashSync("Password", 10),
//         picture: "",
//         chatThreshold: 10,
//         type: "AGENT",
//         status: "VERIFIED",
//         isBlocked: false,
//         forceChangePassword: false,
//         chatThreshold: 200,
//         // departments: [
//         //   {
//         //     _id: department._id
//         //   }
//         // ]
//       });
//       userNotApproved.save();
//       userIdWithoutDepartment=userNotApproved._id;

//    let customer=new Customer({
//     name: "testCustomer",
//     email:"test45@grr.la",
//     mobileNumber: "98412323334"
   
//    })
//    customer.save();
//    customerId=customer._id;

// console.log(
  
// );
//    let chats=new Chats({
//     agent:agentId,
//     agentSessionId:"5c9c5b2c78866a8458170633",
//     customer:customerId,
//     customerSessionId:"5c9c5b2c78866a8458170456",
//     startTime:"1553954655",
//     requestIP:"::1",
//     channelCode:"WEBCHAToooER",
//     department:departmantId,
//     departmentCode:"TESTUPDATE"
//    })
//    console.log("chatlog2"+chats);
//    chats.save();
//    chatId=chats._id;



//     //});
  
//   });
 
//   describe("/api/login", () => {
//     it("should login user", done => {
//       const user = {
//         staffId: "my0001",
//         password: "Password",
//         sourcePortal: "AGENT"
//       };
//       chai
//         .request(server)
//         .post("/api/login")
//         .send(user)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           token = res.body.token;
//           userid = res.body.id;
//           resetpasswordUserId = res.body.id
//           res.should.have.status(200);
//           module.exports.dd=token;
//           console.log("first"+module.exports.dd);
//           done();
//         });
//     });
//     it("should give invalid staffid or passowrd", done => {
//       const user = {
//         staffId: "my0001",
//         password: "Passord",
//         sourcePortal: "AGENT"
//       };
//       chai
//         .request(server)
//         .post("/api/login")
//         .send(user)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(400);
//           done();
//         });
//     });
//     it("should give blocked user", done => {
//       const user = {
//         staffId: "MY0002",
//         password: "Passord",
//         sourcePortal: "AGENT"
//       };
//       chai
//         .request(server)
//         .post("/api/login")
//         .send(user)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(400);
//           done();
//         });
//     });
//     it("should not allow to login for blocked user", done => {
//       const user = {
//         staffId: "MY0002",
//         password: "Passord",
//         sourcePortal: "AGENT"
//       };
//       chai
//         .request(server)
//         .post("/api/login")
//         .send(user)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(400);
//           done();
//         });
//     });
//     it("should not allow to login for unapproved user", done => {
//       const user = {
//         staffId: "MY0003",
//         password: "Passord",
//         sourcePortal: "AGENT"
//       };
//       chai
//         .request(server)
//         .post("/api/login")
//         .send(user)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(400);
//           done();
//         });
//     });
//     it("should give invalid staffid or passowrd", done => {
//       const user = {
//         staffId: "my0001",
//         password: "Password",
//         sourcePortal: "ADMIN"
//       };
//       chai
//         .request(server)
//         .post("/api/login")
//         .send(user)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(400);
//           done();
//         });
//     });
//     it("should give invalid request data", done => {
//       const user = {
//         staffId: "my0001"
//       };
//       chai
//         .request(server)
//         .post("/api/login")
//         .send(user)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(422);
//           done();
//         });
//     });
//     it("should give invalid request data", done => {
//       const user = {
//         password: "Password"
//       };
//       chai
//         .request(server)
//         .post("/api/login")
//         .send(user)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(422);
//           done();
//         });
//     });
//     it("should give invalid request data", done => {
//       const user = {
//         sourcePortal: "ADMIN"
//       };
//       chai
//         .request(server)
//         .post("/api/login")
//         .send(user)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(422);
//           done();
//         });
//     });
//   });

//   describe("/api/users/:id", () => {
//     it("should return 401 Unauthorized", done => {
//       const id = "5cb7fa764d67b967f0db5463";
//       chai
//         .request(server)
//         .get("/api/users/" + userid)
//         .end((err, res) => {
//           res.should.have.status(401);
//           done();
//         });
//     });

//     it("should return 200", done => {
//       chai
//         .request(server)
//         .get("/api/users/" + userid)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(200);
//           done();
//         });
//     });
    
//     it("should return 500", done => {
//       let userid = null
//       chai
//         .request(server)
//         .get("/api/users/" + userid)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(500);
//           done();
//         });
//     });
//   });
  
//   // Reset Password
//   describe("/api/resetpassword/", () => {
//     it("should return 401 Unauthorized", done => {
//       const reqBody = {
//         userId: resetpasswordUserId,
//         password: "Password"
//       };
//       chai
//         .request(server)
//         .post("/api/resetpassword")
//         .send(reqBody)
//         .end((err, res) => {
//           res.should.have.status(401);
//           done();
//         });
//     });

//     it("should return 200", done => {
//       const reqBody = {
//         userId: resetpasswordUserId,
//         password: "Password"
//       };
//       chai
//         .request(server)
//         .post("/api/resetpassword")
//         .send(reqBody)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(200);
//           done();
//         });
//     });
    
//     it("should return 422 userid null", done => {
//       const reqBody = {
//         userId: null,
//         password: "Password"
//       };
//       chai
//         .request(server)
//         .post("/api/resetpassword")
//         .send(reqBody)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(422);
//           done();
//           // console.log(token);
//         });
//     });


//   it("should return 422 password null", done => {
//     const reqBody = {
//       userId: resetpasswordUserId,
//       password: null
//     };
//     chai
//       .request(server)
//       .post("/api/resetpassword")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res).to.be.json;
//         res.should.have.status(422);
//         done();
//       });
//   });
// });
// //End Reset password
// //region Force Password Change


//   describe("/api/forcechangepassword/", () => {

   

//     it("should return 401 Unauthorized", done => {
//       const reqBody = {
//         oldPassword: resetpasswordUserId,
//         password: "Password",
//         confirmPassword :"Password"
//       };
//       chai
//         .request(server)
//         .post("/api/forcechangepassword")
//         .send(reqBody)
//         .end((err, res) => {
//           res.should.have.status(401);
//           done();
//         });
//     });

//     it("Invalid Old Password!", done => {
//       const reqBody = {
//         oldPassword: "sad",
//         password: "P@ssword1",
//         confirmPassword :"P@ssword1"
//       };
//       chai
//         .request(server)
//         .post("/api/forcechangepassword")
//         .send(reqBody)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(400);
//           done();
//         });
//     });
    
//     it("should return 422 pattern doesnot match", done => {
//       const reqBody = {
//         oldPassword: resetpasswordUserId,
//         password: "Password",
//         confirmPassword :"Password"
//       };
//       chai
//         .request(server)
//         .post("/api/forcechangepassword")
//         .send(reqBody)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(422);
//           done();
//         });
//     });

//     it("should return 200", done => {
//       const reqBody = {
//         oldPassword: "Password",
//         password: "Admmin@123",
//         confirmPassword :"Admmin@123"
//       };
//       chai
//         .request(server)
//         .post("/api/forcechangepassword")
//         .send(reqBody)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(200);
//           done();
//         });
//     });

 
//   });
//     // endregion ENd Force password Reset

//     // region Block User
//   describe("/api/users/block", () => {
  

//     it("should return 200", done => {
//       const reqBody = {
//         userId: userid
//       };

//       chai
//         .request(server)
//         .post("/api/users/block")
//         .send(reqBody)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           //expect(res).to.be.json;
//           res.should.have.status(200);
//           done();
//         });
//     });

//     it("should return 422 userId must be a string", done => {
//       const reqBody = {
//         userId: null  
//       };
//       chai
//         .request(server)
//         .post("/api/users/block")
//         .send(reqBody)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(422);
//           done();
//         });
//     });

//     it("should return 500 Cast to ObjectId failed", done => {
//       const reqBody = {
//         userId: "dsdsf"  
//       };
//       chai
//         .request(server)
//         .post("/api/users/block")
//         .send(reqBody)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(500);
//           done();
//         });
//     });

    
//     it("should return 400 Invalid User", done => {
//       const reqBody = {
//         userId: "5cbef2dd4738083ba21f1760"  
//       };
//       chai
//         .request(server)
//         .post("/api/users/block")
//         .send(reqBody)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(400);
//           done();
//         });
//     });

 
//   });
// //endregion Block User

//    // region UnBlock User
//    describe("/api/users/unblock", () => {
  

//     it("should return 200", done => {
//       const reqBody = {
//         userId: userid
//       };
   
//       chai
//         .request(server)
//         .post("/api/users/unblock")
//         .send(reqBody)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           //expect(res).to.be.json;
//           res.should.have.status(200);
//           done();
//         });
//     });

//     it("should return 422 userId must be a string", done => {
//       const reqBody = {
//         userId: null  
//       };
//       chai
//         .request(server)
//         .post("/api/users/unblock")
//         .send(reqBody)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(422);
//           done();
//         });
//     });

//     it("should return 500 Cast to ObjectId failed", done => {
//       const reqBody = {
//         userId: "dsdsf"  
//       };
//       chai
//         .request(server)
//         .post("/api/users/unblock")
//         .send(reqBody)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(500);
//           done();
//         });
//     });

    
//     it("should return 400 Invalid User", done => {
//       const reqBody = {
//         userId: "5cbef2dd4738083ba21f1760"  
//       };
//       chai
//         .request(server)
//         .post("/api/users/unblock")
//         .send(reqBody)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(400);
//           done();
//         });
//     });

 
//   });
// //endregion UnBlock User

//    // region Approve User
//    describe("/api/users/approveuser", () => {
  

//     it("should return 200", done => {
//       const reqBody = {
//         userId: userid
//       };
    
//       chai
//         .request(server)
//         .post("/api/users/approveuser")
//         .send(reqBody)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           //expect(res).to.be.json;
//           res.should.have.status(200);
//           done();
//         });
//     });

//     it("should return 422 userId must be a string", done => {
//       const reqBody = {
//         userId: null  
//       };
//       chai
//         .request(server)
//         .post("/api/users/approveuser")
//         .send(reqBody)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(422);
//           done();
//         });
//     });

//     it("should return 500 Cast to ObjectId failed", done => {
//       const reqBody = {
//         userId: "dsdsf"  
//       };
//       chai
//         .request(server)
//         .post("/api/users/approveuser")
//         .send(reqBody)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(500);
//           done();
//         });
//     });

    
//     it("should return 400 Invalid User", done => {
//       const reqBody = {
//         userId: "5cbef2dd4738083ba21f1760"  
//       };
//       chai
//         .request(server)
//         .post("/api/users/unblock")
//         .send(reqBody)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(400);
//           done();
//         });
//     });

 
//   });
// //endregion Approve User

//    // region Create User
//    describe("/api/users/createuser", () => {
  

//     it("should return 200", done => {
//       const reqBody = {
//         name:"User Create",
//         staffId:"my000289",
//         email:"test265@test.com",
//         password:"Admin@123",
//         icNumber:"23784906876238",
//         type:"AGENT",
//         chatThreshold:20,
//         departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"],
//         customerImage:"jj"
//       };
 
//       chai
//         .request(server)
//         .post("/api/users/createuser")
//         .send(reqBody)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           //expect(res).to.be.json;
//           res.should.have.status(200);
//           done();
//         });
//     }); 

//     it("should return 400 Dublicate email or staff Id", done => {
//       const reqBody = {
//         name:"User Create",
//         staffId:"my000200",
//         email:"test265@test.com",
//         password:"Admin@123",
//         icNumber:"23784906876238",
//         type:"AGENT",
//         chatThreshold:20,
//         departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"],
//         customerImage:"jj"
//       };
   
//       chai
//         .request(server)
//         .post("/api/users/createuser")
//         .send(reqBody)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(400);
//           done();
//         });
//     });

//     it("should return 400 Dublicate email or staff Id", done => {
//       const reqBody = {
//         name:"User Create",
//         staffId:"my000289",
//         email:"test@test.com",
//         password:"Admin@123",
//         icNumber:"23784906876238",
//         type:"AGENT",
//         chatThreshold:20,
//         departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"],
//         customerImage:"jj"
//       };
    
//       chai
//         .request(server)
//         .post("/api/users/createuser")
//         .send(reqBody)
//         .set("Authorization", `Bearer ${token}`)
//         .end((err, res) => {
//           expect(res).to.be.json;
//           res.should.have.status(400);
//           done();
//         });
//     });

//   });
// //endregion Create User

// //region update User
// describe("/api/users/updateuser", () => {
  

//   it("should return 200", done => {
//     const reqBody = {
      
//         id:userid,
//         name:"User Create",
//         staffId:"my00025",
//         email:"UserUpdate@test.com",
//         icNumber:"1111111111",
//         type:"AGENT",
//         chatThreshold:200,
//         departments:[departmantId]
      
//     };

//     chai
//       .request(server)
//       .post("/api/users/updateuser")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res).to.be.json;
//         res.should.have.status(200);
//         done();
//       });
//   });

//   it("should return 400 Dublicate email or staff Id", done => {
//     const reqBody = {
//       id:userid,
//       name:"User Create",
//      // staffId:"my00025",
//       staffId:"MY0003",
//       email:"testYYY@test.com",
//       icNumber:"1111111111",
//       type:"AGENT",
//       chatThreshold:200,
//       departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"]
//     };
  
//     chai
//       .request(server)
//       .post("/api/users/updateuser")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res).to.be.json;
//         res.should.have.status(400);
//         done();
//       });
//   });

//   it("should return 400 Invalid User", done => {
//     const reqBody = {
  
//         id:"5cbef2dd4738083ba21f1790",
//         name:"User Create",
//         staffId:"MY00029",
//         email:"tesfdt@test.com",
//         icNumber:"1111111111",
//         type:"AGENT",
//         chatThreshold:200,
//         departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"]
    
//     };
  
//     chai
//       .request(server)
//       .post("/api/users/updateuser")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res).to.be.json;
//         res.should.have.status(400);
//         done();
//       });
//   });

//   it("should return 400 Invalid User", done => {
//     const reqBody = {
//       id:userid,
//       name:"User Create",
//       staffId:"my0002",
//       email:"testunapproved@test.com",
//       icNumber:"1111111111",
//       type:"AGENT",
//       chatThreshold:200,
//       departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"]
//     };
  
//     chai
//       .request(server)
//       .post("/api/users/updateuser")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res).to.be.json;
//         res.should.have.status(400);
//         done();
//       });
//   });

// });
// //endregion update User

// //region Datatable 
// describe("/api/users/datatable", () => {
  

//   it("should return 200", done => {
//     const reqBody = {
      
//       take: 10,
//       skip: 0,
//       sort: [{
//         field: "email",
//         dir: "asc"
//       }],
//       filter: {
//         logic: "and",
//         filters: []
//       }
      
//     };

//     chai
//       .request(server)
//       .post("/api/users/datatable")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res).to.be.json;
//         res.should.have.status(200);
//         done();
//       });
//   });



// });
// //endregion Datatable User

// //region AgentList 
// describe("/api/agent/list", () => {
  

//   it("should return 200", done => {
//     chai
//       .request(server)
//       .get("/api/agent/list")
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res).to.be.json;
//         res.should.have.status(200);
//         done();
//       });
//   });



// });

// //endregion AgentList 


// //REGION AGENT
// describe("Agents", () => {

    
//   describe("/api/agents/findbyemail", () => {
  
//       it("should return 200", done => {
//         const reqBody = {
//           email: "testblock@test.com"
//         };
   
//         chai
//           .request(server)
//           .post("/api/agents/findbyemail")
//           .set("Authorization", `Bearer ${token}`)
//           .send(reqBody)
//           .end((err, res) => {
//             res.should.have.status(200);
//             done();
//           });
//       });

//       it("No agents found", done => {
//         const reqBody = {
//           email: "testb123ck@test.com"
//         };
   
//         chai
//           .request(server)
//           .post("/api/agents/findbyemail")
//           .set("Authorization", `Bearer ${token}`)
//           .send(reqBody)
//           .end((err, res) => {
//             res.should.have.status(400);
//             done();
//           });
//       });

//       it("email must be a string", done => {
//         const reqBody = {
//           email: null
//         };
   
//         chai
//           .request(server)
//           .post("/api/agents/findbyemail")
//           .set("Authorization", `Bearer ${token}`)
//           .send(reqBody)
//           .end((err, res) => {
//             res.should.have.status(422);
//             done();
//           });
//       });

//       it("email must be a valid email", done => {
//         const reqBody = {
//           email: "8Square"
//         };
   
//         chai
//           .request(server)
//           .post("/api/agents/findbyemail")
//           .set("Authorization", `Bearer ${token}`)
//           .send(reqBody)
//           .end((err, res) => {
//             res.should.have.status(422);
//             done();
//           });
//       });
//       it("email is not allowed to be empty", done => {
//         const reqBody = {
//           email: ""
//         };
   
//         chai
//           .request(server)
//           .post("/api/agents/findbyemail")
//           .set("Authorization", `Bearer ${token}`)
//           .send(reqBody)
//           .end((err, res) => {
//             res.should.have.status(422);
//             done();
//           });
//       });
//       it("No departments available", done => {
//         const reqBody = {
//           email: "testunapproved@test.com"
//         };
   
//         chai
//           .request(server)
//           .post("/api/agents/findbyemail")
//           .set("Authorization", `Bearer ${token}`)
//           .send(reqBody)
//           .end((err, res) => {
//             res.should.have.status(400);
//             done();
//           });
//       });

      
//   });
//   describe("/api/agents/findbyid", () => {
  
//     it("should return 200", done => {
//       console.log("userIDDD"+userid);
//       const reqBody = {
//         agentId:userid
//       };
 
//       chai
//         .request(server)
//         .post("/api/agents/findbyid")
//         .set("Authorization", `Bearer ${token}`)
//         .send(reqBody)
//         .end((err, res) => {
//           res.should.have.status(200);
//           done();
//         });
//     });

//     it("No agents found", done => {
//       const reqBody = {
//         agentId: departmantId
//       };
 
//       chai
//         .request(server)
//         .post("/api/agents/findbyid")
//         .set("Authorization", `Bearer ${token}`)
//         .send(reqBody)
//         .end((err, res) => {
//           res.should.have.status(400);
//           done();
//         });
//     });
 
//     it("agentId must be a string", done => {
//       const reqBody = {
//         agentId: null
//       };
 
//       chai
//         .request(server)
//         .post("/api/agents/findbyid")
//         .set("Authorization", `Bearer ${token}`)
//         .send(reqBody)
//         .end((err, res) => {
//           res.should.have.status(422);
//           done();
//         });
//     });

  
//     it("agentId is not allowed to be empty", done => {
//       const reqBody = {
//         agentId: ""
//       };
 
//       chai
//         .request(server)
//         .post("/api/agents/findbyid")
//         .set("Authorization", `Bearer ${token}`)
//         .send(reqBody)
//         .end((err, res) => {
//           res.should.have.status(422);
//           done();
//         });
//     });

//     it("No departments available", done => {
//       const reqBody = {
//         agentId: userIdWithoutDepartment
//       };
 
//       chai
//         .request(server)
//         .post("/api/agents/findbyid")
//         .set("Authorization", `Bearer ${token}`)
//         .send(reqBody)
//         .end((err, res) => {
//           res.should.have.status(400);
//           done();
//         });
//     });

    
// });
//   });


// //END REGION AGENT


// //REGION Department

// describe("Department", () => {

//   describe("/api/department/findbydepartmentcode", () => {
  
//     it("should return 200", done => {
//       const reqBody = {
//         code: "GASDGJ"
//       };
 
//       chai
//         .request(server)
//         .post("/api/department/findbydepartmentcode")
//         .set("Authorization", `Bearer ${token}`)
//         .send(reqBody)
//         .end((err, res) => {
//           res.should.have.status(200);
//           done();
//         });
//     });

//     it("No active Departments", done => {
//       const reqBody = {
//         code: "NoActiveDepartmet"
//       };
 
//       chai
//         .request(server)
//         .post("/api/department/findbydepartmentcode")
//         .set("Authorization", `Bearer ${token}`)
//         .send(reqBody)
//         .end((err, res) => {
//           res.should.have.status(400);
//           done();
//         });
//     });

//     it("code must be a string", done => {
//       const reqBody = {
//         code: null
//       };
 
//       chai
//         .request(server)
//         .post("/api/department/findbydepartmentcode")
//         .set("Authorization", `Bearer ${token}`)
//         .send(reqBody)
//         .end((err, res) => {
//           res.should.have.status(422);
//           done();
//         });
//     });

//     it("code is not allowed to be empty", done => {
//       const reqBody = {
//         code: ""
//       };
 
//       chai
//         .request(server)
//         .post("/api/department/findbydepartmentcode")
//         .set("Authorization", `Bearer ${token}`)
//         .send(reqBody)
//         .end((err, res) => {
//           res.should.have.status(422);
//           done();
//         });
//     });
  

    
// });

// describe("/api/department/list", () => {
  
//   it("should return 200", done => {
   

//     chai
//       .request(server)
//       .get("/api/department/list")
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });




  
// });

// describe("/api/department/getbyid", () => {
  
//   it("should return 200", done => {
   

//     chai
//       .request(server)
//       .get("/api/department/getbyid/"+departmantId)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });




  
// });

// describe("/api/department/datatable", () => {
  
//   it("should return 200", done => {
//     const reqBody = {
//       take: 10,
//       skip: 0,
//       sort: [],
//       filter: {}
//     };

//     chai
//       .request(server)
//       .post("/api/department/datatable/")
//       .set("Authorization", `Bearer ${token}`)
//       .send(reqBody)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });




  
// });

// describe("/api/department/create", () => {
  
//   it("should return 200", done => {
//     const reqBody = {
//       name: "test",
//       displayName:"test",
//       code: "test",
//       channels: [{
//       code: "WEB"
//       },
//       {
//         code: "WEB"
//       }],
//       preChatForm: {
//         isRequired: true,
//         name: true,
//         email: true,
//         mobile: true,
//         nameRequired: true,
//         mobileRequired: true,
//         emailRequired: true
//       },
//       offlineForm: {
//         isRequired: true,
//         name: true,
//         email: true,
//         mobile: true,
//         nameRequired: true,
//         mobileRequired: true,
//         emailRequired: true
//       },
//       offlineFormMessage: "ajshdkad",
//       offlineFormEmail: "chatbox@grr.la",
//       chatSetting: {
//         closeTime: 10,
//         uniqueIdentifier: "EMAIL"
//       },
//       openingDetails: [{
//           day: "Monday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Tuesday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Wednesday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Thursday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Friday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Saturday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Sunday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         }
//       ]
//     };

//     chai
//       .request(server)
//       .post("/api/department/create/")
//       .set("Authorization", `Bearer ${token}`)
//       .send(reqBody)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });

//   it("Dublicate department code", done => {
//     const reqBody = {
//       name: "test",
//       displayName:"test",
//       code: "test",
//       channels: [{
//       code: "WEB"
//       },
//       {
//         code: "WEB"
//       }],
//       preChatForm: {
//         isRequired: true,
//         name: true,
//         email: true,
//         mobile: true,
//         nameRequired: true,
//         mobileRequired: true,
//         emailRequired: true
//       },
//       offlineForm: {
//         isRequired: true,
//         name: true,
//         email: true,
//         mobile: true,
//         nameRequired: true,
//         mobileRequired: true,
//         emailRequired: true
//       },
//       offlineFormMessage: "ajshdkad",
//       offlineFormEmail: "chatbox@grr.la",
//       chatSetting: {
//         closeTime: 10,
//         uniqueIdentifier: "EMAIL"
//       },
//       openingDetails: [{
//           day: "Monday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Tuesday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Wednesday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Thursday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Friday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Saturday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Sunday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         }
//       ]
//     };

//     chai
//       .request(server)
//       .post("/api/department/create/")
//       .set("Authorization", `Bearer ${token}`)
//       .send(reqBody)
//       .end((err, res) => {
//         res.should.have.status(400);
//         done();
//       });
//   });

  
// });

// describe("/api/department/update", () => {
  
//   it("should return 200", done => {
//     const reqBody = {
//       id:departmantId,
//       name: "test",
//       displayName:"test",
//       code: "testUPDATE",
//       channels: [{
//       code: "WEB"
//       },
//       {
//         code: "WEB"
//       }],
//       preChatForm: {
//         isRequired: true,
//         name: true,
//         email: true,
//         mobile: true,
//         nameRequired: true,
//         mobileRequired: true,
//         emailRequired: true
//       },
//       offlineForm: {
//         isRequired: true,
//         name: true,
//         email: true,
//         mobile: true,
//         nameRequired: true,
//         mobileRequired: true,
//         emailRequired: true
//       },
//       offlineFormMessage: "ajshdkad",
//       offlineFormEmail: "chatbox@grr.la",
//       chatSetting: {
//         closeTime: 10,
//         uniqueIdentifier: "EMAIL"
//       },
//       openingDetails: [{
//           day: "Monday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Tuesday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Wednesday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Thursday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Friday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Saturday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Sunday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         }
//       ]
//     };

//     chai
//       .request(server)
//       .post("/api/department/update/")
//       .set("Authorization", `Bearer ${token}`)
//       .send(reqBody)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });

//   it("Dublicate department code", done => {
//     const reqBody = {
//       id:departmantId,
//       name: "test",
//       displayName:"test",
//       code: "test",
//       channels: [{
//       code: "WEB"
//       },
//       {
//         code: "WEB"
//       }],
//       preChatForm: {
//         isRequired: true,
//         name: true,
//         email: true,
//         mobile: true,
//         nameRequired: true,
//         mobileRequired: true,
//         emailRequired: true
//       },
//       offlineForm: {
//         isRequired: true,
//         name: true,
//         email: true,
//         mobile: true,
//         nameRequired: true,
//         mobileRequired: true,
//         emailRequired: true
//       },
//       offlineFormMessage: "ajshdkad",
//       offlineFormEmail: "chatbox@grr.la",
//       chatSetting: {
//         closeTime: 10,
//         uniqueIdentifier: "EMAIL"
//       },
//       openingDetails: [{
//           day: "Monday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Tuesday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Wednesday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Thursday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Friday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Saturday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         },
//         {
//           day: "Sunday",
//           openingTime: 400,
//           closingTime: 1080,
//           isActive: true
//         }
//       ]
//     };

//     chai
//       .request(server)
//       .post("/api/department/update/")
//       .set("Authorization", `Bearer ${token}`)
//       .send(reqBody)
//       .end((err, res) => {
//         res.should.have.status(400);
//         done();
//       });
//   });
 

  
// });

// describe("/api/department/block", () => {
  

//   it("should return 200", done => {
//     const reqBody = {
//       departmentId: departmantId
//     };

//     chai
//       .request(server)
//       .post("/api/department/block")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res).to.be.json;
//         res.should.have.status(200);
//         done();
//       });
//   });

//   it("should return 422 departmentId is not allowed to be empty", done => {
//     const reqBody = {
//       departmentId: ""  
//     };
//     chai
//       .request(server)
//       .post("/api/department/block")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res).to.be.json;
//         res.should.have.status(422);
//         done();
//       });
//   });
//   it("should return 422 departmentId must be a string", done => {
//     const reqBody = {
//       departmentId: null  
//     };
//     chai
//       .request(server)
//       .post("/api/department/block")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res).to.be.json;
//         res.should.have.status(422);
//         done();
//       });
//   });

//   it("should return 500 Cast to ObjectId failed", done => {
//     const reqBody = {
//       departmentId: "dsdsf"  
//     };
//     chai
//       .request(server)
//       .post("/api/department/block")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res).to.be.json;
//         res.should.have.status(500);
//         done();
//       });
//   });

// });

// describe("/api/department/unblock", () => {
  

//   it("should return 200", done => {
//     const reqBody = {
//       departmentId: departmantId
//     };

//     chai
//       .request(server)
//       .post("/api/department/unblock")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         //expect(res).to.be.json;
//         res.should.have.status(200);
//         done();
//       });
//   });

//   it("should return 422 departmentId is not allowed to be empty", done => {
//     const reqBody = {
//       departmentId: ""  
//     };
//     chai
//       .request(server)
//       .post("/api/department/unblock")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res).to.be.json;
//         res.should.have.status(422);
//         done();
//       });
//   });
//   it("should return 422 departmentId must be a string", done => {
//     const reqBody = {
//       departmentId: null  
//     };
//     chai
//       .request(server)
//       .post("/api/department/unblock")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res).to.be.json;
//         res.should.have.status(422);
//         done();
//       });
//   });

//   it("should return 500 Cast to ObjectId failed", done => {
//     const reqBody = {
//       departmentId: "dsdsf"  
//     };
//     chai
//       .request(server)
//       .post("/api/department/unblock")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res).to.be.json;
//         res.should.have.status(500);
//         done();
//       });
//   });

// });

// });
// //END REGION Department 

// //Region Chat

// describe("Chat", () => {
// describe("/api/chat/saveChat", () => {
  

//   it("should return 200", done => {
//     const reqBody = {
//       agentId:userid,
//       agentSessionId:"5c9c5b2c78866a8458170633",
//       customerId:customerId,
//       customerSessionId:"5c9c5b2c78866a8458170456",
//       startTime:"1553954655",
//       requestIP:"::1",
//       channelCode:"WEB",
//       department:departmantId,
//       departmentCode:"TESTUPDATE"
//     };

//     chai
//       .request(server)
//       .post("/api/chat/saveChat")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         //expect(res).to.be.json;
//         res.should.have.status(200);
//         done();
//       });
//   });

//   it("Department/Agent/Customer not found", done => {
//     const reqBody = {
//       agentId:"5c9c5b2c78866a8458170633",//fault Agent Id
//       agentSessionId:"5c9c5b2c78866a8458170633",
//       customerId:customerId,
//       customerSessionId:"5c9c5b2c78866a8458170456",
//       startTime:"1553954655",
//       requestIP:"::1",
//       channelCode:"WEB",
//       departmentCode:"TESTUPDATE"
//     };

//     chai
//       .request(server)
//       .post("/api/chat/saveChat")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         //expect(res).to.be.json;
//         res.should.have.status(400);
//         done();
//       });
//   });
//   it("Department/Agent/Customer not found", done => {
//     const reqBody = {
//       agentId:userid,
//       agentSessionId:"5c9c5b2c78866a8458170633",
//       customerId:"5c9c5b2c78866a8458170633",//Fault customer Id
//       customerSessionId:"5c9c5b2c78866a8458170456",
//       startTime:"1553954655",
//       requestIP:"::1",
//       channelCode:"WEB",
//       departmentCode:"TESTUPDATE"
//     };

//     chai
//       .request(server)
//       .post("/api/chat/saveChat")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         //expect(res).to.be.json;
//         res.should.have.status(400);
//         done();
//       });
//   });
//   it("Department/Agent/Customer not found", done => {
//     const reqBody = {
//       agentId:userid,
//       agentSessionId:"5c9c5b2c78866a8458170633",
//       customerId:customerId,
//       customerSessionId:"5c9c5b2c78866a8458170456",
//       startTime:"1553954655",
//       requestIP:"::1",
//       channelCode:"WEB",
//       departmentCode:"FaultDepartMentCode" //Fault Department Code
//     };

//     chai
//       .request(server)
//       .post("/api/chat/saveChat")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         //expect(res).to.be.json;
//         res.should.have.status(400);
//         done();
//       });
//   });

//   it("agentId is required", done => {//Request without Agent Id
//     const reqBody = {
  
//       agentSessionId:"5c9c5b2c78866a8458170633",
//       customerId:customerId,
//       customerSessionId:"5c9c5b2c78866a8458170456",
//       startTime:"1553954655",
//       requestIP:"::1",
//       channelCode:"WEB",
//       departmentCode:"FaultDepartMentCode" 
//     };

//     chai
//       .request(server)
//       .post("/api/chat/saveChat")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         //expect(res).to.be.json;
//         res.should.have.status(422);
//         done();
//       });
//   });
//   it("customerId is required", done => {//Request without Customer Id
//     const reqBody = {
//       agentId:userid,
//       agentSessionId:"5c9c5b2c78866a8458170633",

//       customerSessionId:"5c9c5b2c78866a8458170456",
//       startTime:"1553954655",
//       requestIP:"::1",
//       channelCode:"WEB",
//       departmentCode:"FaultDepartMentCode" 
//     };

//     chai
//       .request(server)
//       .post("/api/chat/saveChat")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         //expect(res).to.be.json;
//         res.should.have.status(422);
//         done();
//       });
//   });
//   it("agentId is required // customerId is required // departmentCode is required", done => {//Request without Customer Id/agentId/departmntCode
//     const reqBody = {
     
//       agentSessionId:"5c9c5b2c78866a8458170633",

//       customerSessionId:"5c9c5b2c78866a8458170456",
//       startTime:"1553954655",
//       requestIP:"::1",
//       channelCode:"WEB",
  
//     };

//     chai
//       .request(server)
//       .post("/api/chat/saveChat")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         //expect(res).to.be.json;
//         res.should.have.status(422);
//         done();
//       });
//   });
//   it("agentId must be a string", done => { //null agentId
//     const reqBody = {
//       agentId:null,
//       agentSessionId:"5c9c5b2c78866a8458170633",
//       customerId:customerId,
//       customerSessionId:"5c9c5b2c78866a8458170456",
//       startTime:"1553954655",
//       requestIP:"::1",
//       channelCode:"WEB",
//       departmentCode:"FaultDepartMentCode" //Fault Department Code
//     };

//     chai
//       .request(server)
//       .post("/api/chat/saveChat")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         //expect(res).to.be.json;
//         res.should.have.status(422);
//         done();
//       });
//   });
//   it("agentId is not allowed to be empty", done => { //null agentId
//     const reqBody = {
//       agentId:"",
//       agentSessionId:"5c9c5b2c78866a8458170633",
//       customerId:customerId,
//       customerSessionId:"5c9c5b2c78866a8458170456",
//       startTime:"1553954655",
//       requestIP:"::1",
//       channelCode:"WEB",
//       departmentCode:"FaultDepartMentCode" //Fault Department Code
//     };

//     chai
//       .request(server)
//       .post("/api/chat/saveChat")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         //expect(res).to.be.json;
//         res.should.have.status(422);
//         done();
//       });
//   });

 

// });
// describe("/api/chat/updateChat", () => {

  
//   it("should return 200", done => {
//     const reqBody = {
//       chatId:chatId,
//       endTime:"1553954655",
//       rating:5,
//       status:"DJJJJJone"
//     };

//     chai
//       .request(server)
//       .post("/api/chat/updateChat")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         //expect(res).to.be.json;
//         res.should.have.status(200);
//         done();
//       });
//   });
    
//   it("invalid chatId!", done => {
//     const reqBody = {
//       chatId:"5cc68f4fecc5663bf58b1815",//Invalid Chat Id
//       endTime:"1553954655",
//       rating:5,
//       status:"Done"
//     };

//     chai
//       .request(server)
//       .post("/api/chat/updateChat")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         //expect(res).to.be.json;
//         res.should.have.status(400);
//         done();
//       });
//   });
//   it("invalid chatId!", done => {
//     const reqBody = {
//       chatId:"5cc68f4fecc5663bf58b1815",//Invalid Chat Id
//       endTime:"1553954655",
//       rating:5,
//       status:"Done"
//     };

//     chai
//       .request(server)
//       .post("/api/chat/updateChat")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         //expect(res).to.be.json;
//         res.should.have.status(400);
//         done();
//       });
//   });
//   it("endTime is required // rating is required // status is required", done => { //Request without endTime,rating and status
//     const reqBody = {
//       chatId:chatId, 
//     };

//     chai
//       .request(server)
//       .post("/api/chat/updateChat")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         //expect(res).to.be.json;
//         res.should.have.status(422);
//         done();
//       });
//   });
//   it("endTime must be a number of milliseconds or valid date string // rating must be a number // status must be a string", done => { //Request with endTime,rating and status null
//   const reqBody = {
//     chatId:chatId, 

//     endTime:null,
//     rating:null,
//     status:null
//   };

//   chai
//     .request(server)
//     .post("/api/chat/updateChat")
//     .send(reqBody)
//     .set("Authorization", `Bearer ${token}`)
//     .end((err, res) => {
//       //expect(res).to.be.json;
//       res.should.have.status(422);
//       done();
//     });
// });
// it("endTime must be a number of milliseconds or valid date string // rating must be a number // status is not allowed to be empty", done => { //Request with endTime,rating and status empty string
// const reqBody = {
//   chatId:chatId, 

//   endTime:"",
//   rating:"",
//   status:""
// };

// chai
//   .request(server)
//   .post("/api/chat/updateChat")
//   .send(reqBody)
//   .set("Authorization", `Bearer ${token}`)
//   .end((err, res) => {
//     //expect(res).to.be.json;
//     res.should.have.status(422);
//     done();
//   });
// });

// });

// describe("/api/chat/getChatHistory", () => {
 
//   it("should return 200", done => {
//     console.log(customerId);
//     const reqBody = {
//       customerId:customerId,
//       pageNo:1,
//       size:10,
//       departmentCode:"TESTUPDATE"
//     };

//     chai
//       .request(server)
//       .post("/api/chat/getChatHistory")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         //expect(res).to.be.json;
//         res.should.have.status(200);
//         done();
//       });
//   });
//   it("invalid page number, should start with 1", done => {
//     console.log(customerId);
//     const reqBody = {
//       customerId:customerId,
//       pageNo:0,
//       size:10,
//       departmentCode:"TESTUPDATE"
//     };

//     chai
//       .request(server)
//       .post("/api/chat/getChatHistory")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         //expect(res).to.be.json;
//         res.should.have.status(400);
//         done();
//       });
//   });
// });

// describe("/api/chat/saveBulkChatHistory", () => {
 
//   it("should return 200", done => {
//     // console.log(customerId);
//     // console.log(userid);
//     // console.log(chatId);
//     const reqBody = {
//     	messages: [
//         {
//         chatId: chatId,
//         agentId:userid,
//         customerId:customerId,
//         departmentCode: "TESTUPDATE",
//         isAgentChat: false,
//         timeStamp: "1553954655",
//         message: "hello agent"
//       },
//       {
//         chatId: chatId,
//         agentId:userid,
//         customerId:customerId,
//         departmentCode: "TESTUPDATE",
//         isAgentChat: true,
//         timeStamp: "1553954655",
//         message: "hello customer"
//       },
//       {
//         chatId: chatId,
//         agentId:userid,
//         customerId:customerId,
//         departmentCode: "TESTUPDATE",
//         isAgentChat: false,
//         timeStamp: "1553954655",
//         message: "hello agent"
//       },
      
//       {
//         chatId: chatId,
//         agentId:userid,
//         customerId:customerId,
//         departmentCode: "TESTUPDATE",
//         isAgentChat: true,
//         timeStamp: "1553954655",
//         message: "hello customer"
//       }

//     ]
//     };

//     chai
//       .request(server)
//       .post("/api/chat/saveBulkChatHistory")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res).to.be.json;
//         res.should.have.status(200);
//         done();
//       });
//   });


//   it("should return 200", done => {
//     // console.log(customerId);
//     // console.log(userid);
//     // console.log(chatId);
//     var data=[];
//    for(var i=0;i<478;i++)
//    {
//     data.push(
//       {
//         chatId: chatId,
//         agentId:userid,
//         customerId:customerId,
//         departmentCode: "TESTUPDATE",
//         isAgentChat: false,
//         timeStamp: "1553954655",
//         message: "hello agent"
//       }
//     )
//    }
//     const reqBody = {
//     	messages: data
       
    
//     };
// //console.log(data);
//     chai
//       .request(server)
//       .post("/api/chat/saveBulkChatHistory")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         //expect(res).to.be.json;
//         res.should.have.status(200);
//         done();
//       });
//   });

//   it("should return 200", done => {
//     // console.log(customerId);
//     // console.log(userid);
//     // console.log(chatId);
//     var data=[];
//    for(var i=0;i<578;i++)
//    {
//     data.push(
//       {
//         chatId: chatId,
//         agentId:userid,
//         customerId:customerId,
//         departmentCode: "TESTUPDATE",
//         isAgentChat: false,
//         timeStamp: "1553954655",
//         message: "hello agent"
//       }
//     )
//    }
//     const reqBody = {
//     	messages: data
       
    
//     };
// //console.log(data);
//     chai
//       .request(server)
//       .post("/api/chat/saveBulkChatHistory")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res).to.be.json;
//         res.should.have.status(200);
//         done();
//       });
//   });

//   it("Invalid customerId or agentId or chatId", done => {
//     // console.log(customerId);
//     // console.log(userid);
//     // console.log(chatId);
//     const reqBody = {
//     	messages: [
//         {
//         chatId: userid,
//         agentId:userid,
//         customerId:customerId,
//         departmentCode: "TESTUPDATE",
//         isAgentChat: false,
//         timeStamp: "1553954655",
//         message: "hello agent"
//       },
//       {
//         chatId: chatId,
//         agentId:userid,
//         customerId:customerId,
//         departmentCode: "TESTUPDATE",
//         isAgentChat: true,
//         timeStamp: "1553954655",
//         message: "hello customer"
//       },
//       {
//         chatId: chatId,
//         agentId:userid,
//         customerId:customerId,
//         departmentCode: "TESTUPDATE",
//         isAgentChat: false,
//         timeStamp: "1553954655",
//         message: "hello agent"
//       },
      
//       {
//         chatId: chatId,
//         agentId:chatId,
//         customerId:customerId,
//         departmentCode: "TESTUPDATE",
//         isAgentChat: true,
//         timeStamp: "1553954655",
//         message: "hello customer"
//       }

//     ]
//     };

//     chai
//       .request(server)
//       .post("/api/chat/saveBulkChatHistory")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         //expect(res).to.be.json;
//         res.should.have.status(400);
//         done();
//       });
//   });

//   it("Invalid customerId or agentId or chatId", done => {
//     // console.log(customerId);
//     // console.log(userid);
//     // console.log(chatId);
//     const reqBody = {
//     	messages: [
//         {
//         chatId: chatId,
//         agentId:userid,
//         customerId:customerId,
//         departmentCode: "TESTUPDATE",
//         isAgentChat: false,
//         timeStamp: "1553954655",
//         message: "hello agent"
//       },
//       {
//         chatId: userid,
//         agentId:userid,
//         customerId:userid,
//         departmentCode: "TESTUPDATE",
//         isAgentChat: true,
//         timeStamp: "1553954655",
//         message: "hello customer"
//       },
//       {
//         chatId: chatId,
//         agentId:userid,
//         customerId:userid,
//         departmentCode: "TESTUPDATE",
//         isAgentChat: false,
//         timeStamp: "1553954655",
//         message: "hello agent"
//       },
      
//       {
//         chatId: chatId,
//         agentId:chatId,
//         customerId:customerId,
//         departmentCode: "TESTUPDATE",
//         isAgentChat: true,
//         timeStamp: "1553954655",
//         message: "hello customer"
//       }

//     ]
//     };

//     chai
//       .request(server)
//       .post("/api/chat/saveBulkChatHistory")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         //expect(res).to.be.json;
//         res.should.have.status(400);
//         done();
//       });
//   });

// });

// describe("/api/chat/datatable", () => {
 
//   it("should return 200", done => {
    
//     const reqBody = {
//       take: 10,
//       skip: 0,
//       sort: [{
//         field: "startTime",
//         dir: "asc"
//       }],
//       filter: {
//         logic: "and",
//         filters: []
//       }
//     };

//     chai
//       .request(server)
//       .post("/api/chat/datatable")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res).to.be.json;
//         res.should.have.status(200);
//         done();
//       });
//   });
//   // it("invalid page number, should start with 1", done => {
//   //   console.log(customerId);
//   //   const reqBody = {
//   //     take: 2,
//   //     skip: 0,
//   //     sort: [{
//   //       field: "email",
//   //       dir: "asc"
//   //     }],
//   //     filter: {
//   //       logic: "and",
//   //       filters: []
//   //     }
//   //   };

//   //   chai
//   //     .request(server)
//   //     .post("/api/chat/datatable")
//   //     .send(reqBody)
//   //     .set("Authorization", `Bearer ${token}`)
//   //     .end((err, res) => {
//   //       expect(res).to.be.json;

//   //       res.should.have.status(400);
//   //       done();
      
//   //     });
//   // });
// });



// });
// //End Region Chat

// //Region Email
// describe("Email", () => {
//   it("should return 200", done => {
    
//     const reqBody = {
//       customerName: "Test Name",
//       customerEmail: "bijay@grr.la",
//       customerMobileNumber:"213546461231",
//       message:"Test Test",
//       departmentCode:"TEST"
//     };

//     chai
//       .request(server)
//       .post("/api/email/offline")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res).to.be.json;
//         res.should.have.status(200);
//         done();
//       });
//   });
//   it("should return Invalid Email Id", done => {
    
//     const reqBody = {
//       customerName: "Test Name",
//       customerEmail: "bijaygrr.la",
//       customerMobileNumber:"213546461231",
//       message:"Test Test",
//       departmentCode:"TEST"
//     };

//     chai
//       .request(server)
//       .post("/api/email/offline")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res).to.be.json;
//         res.should.have.status(400);
//         done();
//       });
//   });
//   it("should return Invalid Customer Mobile Number", done => {
    
//     const reqBody = {
//       customerName: "Test Name",
//       customerEmail: "bijay@grr.la",
//       customerMobileNumber:"21adfaasd35asdfadf46461231",
//       message:"Test Test",
//       departmentCode:"TEST"
//     };

//     chai
//       .request(server)
//       .post("/api/email/offline")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res).to.be.json;
//         res.should.have.status(400);
//         done();
//       });
//   });
//   it("should return Invalid Department Code", done => {
    
//     const reqBody = {
//       customerName: "Test Name",
//       customerEmail: "bijay@grr.la",
//       customerMobileNumber:"213546461231",
//       message:"Test Test",
//       departmentCode:"TEdsdsddsST"
//     };

//     chai
//       .request(server)
//       .post("/api/email/offline")
//       .send(reqBody)
//       .set("Authorization", `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res).to.be.json;
//         res.should.have.status(400);
//         done();
//       });
//   });
// })
// //EndRegion Email

//   // afterEach(async () => {
//   //   await Department.deleteMany();
//   //   await User.deleteMany();
//   // });

//   after(async () => {
   
//     mongoose.connection.close();
//     server.close();
//   });
// });
