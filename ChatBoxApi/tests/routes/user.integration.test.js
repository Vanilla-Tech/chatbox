//During the test the env variable is set to test
const bcrypt = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string");
var importValue = require('./migration.integration.test');
//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
let server = require("../../api");

const mongoose = require("mongoose");
const should = chai.should();
const expect = chai.expect;
//mongoose.Promise=global.Promise;
chai.use(chaiHttp);
var token,userid,resetpasswordUserId;




    

describe("User", () => {

    
   
        describe("/api/login", () => {
            it("should login user", done => {
              const user = {
                staffId: "MY0006",
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
                  console.log("token1:"+token);
                  userid = res.body.id;
                  
                  useridd=res.body.id;
                 
                  resetpasswordUserId = res.body.id
                  res.should.have.status(200);
                  done();
                });
            });
            it("StaffId or password is incorrect", done => {
              const user = {
                staffId: "my0001",
                password: "Passord",
                sourcePortal: "AGENT"
              };
              chai
                .request(server)
                .post("/api/login")
                .send(user)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(400);
                  done();
                });
            });
            it("Your account is blocked", done => {
              const user = {
                staffId: "MY0002",
                password: "Password",
                sourcePortal: "AGENT"
              };
              chai
                .request(server)
                .post("/api/login")
                .send(user)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(400);
                  done();
                });
            });
            it("should not allow to login for blocked user", done => {
              const user = {
                staffId: "MY0002",
                password: "Password",
                sourcePortal: "AGENT"
              };
              chai
                .request(server)
                .post("/api/login")
                .send(user)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(400);
                  done();
                });
            });
            it("Your account is inactive", done => {
              const user = {
                staffId: "MY0004",
                password: "Password",
                sourcePortal: "AGENT"
              };
              chai
                .request(server)
                .post("/api/login")
                .send(user)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(400);
                  done();
                });
            });
            it("should give invalid staffid or passowrd", done => {
              const user = {
                staffId: "my0001",
                password: "Password",
                sourcePortal: "ADMIN"
              };
              chai
                .request(server)
                .post("/api/login")
                .send(user)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(400);
                  done();
                });
            });
            it("should give invalid request data", done => {
              const user = {
                staffId: "my0001"
              };
              chai
                .request(server)
                .post("/api/login")
                .send(user)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(422);
                  done();
                });
            });
            it("should give invalid request data", done => {
              const user = {
                password: "Password"
              };
              chai
                .request(server)
                .post("/api/login")
                .send(user)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(422);
                  done();
                });
            });
            it("should give invalid request data", done => {
              const user = {
                sourcePortal: "ADMIN"
              };
              chai
                .request(server)
                .post("/api/login")
                .send(user)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(422);
                  done();
                });
            });
          });
        
          describe("/api/users/:id", () => {
            
            it("should return 401 Unauthorized", done => {
              console.log("UserID:"+userid);
              const id = "5cb7fa764d67b967f0db5463";
              chai
                .request(server)
                .get("/api/users/" + userid)
                .end((err, res) => {
                  res.should.have.status(401);
                  done();
                });
            });
        
            it("should return 200", done => {
              chai
                .request(server)
                .get("/api/users/" + userid)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(200);
                  done();
                });
            });

            it("should return Invalid Request", done => {
              chai
                .request(server)
                .get("/api/users/5cc2993ef005376db413ad3c")
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(400);
                  done();
                });
            });
            
            it("should return 500", done => {
              let userid = null
              chai
                .request(server)
                .get("/api/users/" + userid)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(500);
                  done();
                });
            });
          });
          
          // Reset Password
          describe("/api/resetpassword/", () => {
            it("should return 401 Unauthorized", done => {
              const reqBody = {
                userId: resetpasswordUserId,
                password: "Password"
              };
              chai
                .request(server)
                .post("/api/resetpassword")
                .send(reqBody)
                .end((err, res) => {
                  res.should.have.status(401);
                  done();
                });
            });
        
            it("should return 200", done => {
              const reqBody = {
                userId: resetpasswordUserId,
                password: "Password"
              };
              chai
                .request(server)
                .post("/api/resetpassword")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(200);
                  done();
                });
            });
            it("should return 400- Invalid User!", done => {
              const reqBody = {
                userId: "5cc2993ef005376db413ad3c",
                password: "Password"
              };
              chai
                .request(server)
                .post("/api/resetpassword")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(400);
                  done();
                });
            });

            it("should return 500- Cast to ObjectId failed for value \"5CC2993EF005376D3C\" at path \"_id\" for model \"User\"!", done => {
              const reqBody = {
                userId: "5cc213ad3c",
                password: "Password"
              };
              chai
                .request(server)
                .post("/api/resetpassword")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(500);
                  done();
                });
            });
            
            
            it("userId must be a string", done => {
              const reqBody = {
                userId: null,
                password: "Password"
              };
              chai
                .request(server)
                .post("/api/resetpassword")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(422);
                  done();
                
                });
            });
        
        
          it("password must be a string", done => {
            const reqBody = {
              userId: resetpasswordUserId,
              password: null
            };
            chai
              .request(server)
              .post("/api/resetpassword")
              .send(reqBody)
              .set("Authorization", `Bearer ${token}`)
              .end((err, res) => {
                expect(res).to.be.json;
                res.should.have.status(422);
                done();
              });
          });
        });
        //End Reset password
        //region Force Password Change
        
        
          describe("/api/forcechangepassword/", () => {
        
           
        
            it("should return 401 Unauthorized", done => {
              const reqBody = {
                oldPassword: resetpasswordUserId,
                password: "Password",
                confirmPassword :"Password"
              };
              chai
                .request(server)
                .post("/api/forcechangepassword")
                .send(reqBody)
                .end((err, res) => {
                  res.should.have.status(401);
                  done();
                });
            });
        
            it("Invalid Old Password!", done => {
              const reqBody = {
                oldPassword: "sad",
                password: "P@ssword1",
                confirmPassword :"P@ssword1"
              };
              chai
                .request(server)
                .post("/api/forcechangepassword")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(400);
                  done();
                });
            });
            
            it("should return 422 pattern doesnot match", done => {
              const reqBody = {
                oldPassword: resetpasswordUserId,
                password: "Password",
                confirmPassword :"Password"
              };
              chai
                .request(server)
                .post("/api/forcechangepassword")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(422);
                  done();
                });
            });

          

            it("confirmPassword must be one of [ref:password](422)", done => {
              const reqBody = {
                oldPassword: "Password",
                password: "Password",
                confirmPassword :"Passwo"
              };
              chai
                .request(server)
                .post("/api/forcechangepassword")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(422);
                  done();
                });
            });

            it("password with value Password1 fails to match the required pattern(422)", done => {
              const reqBody = {
                oldPassword: "Password",
                password: "Password1",
                confirmPassword :"Password1"
              };
              chai
                .request(server)
                .post("/api/forcechangepassword")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(422);
                  done();
                });
            });
        
        
            it("should return 200", done => {
              const reqBody = {
                oldPassword: "Password",
                password: "Admmin@123",
                confirmPassword :"Admmin@123"
              };
              chai
                .request(server)
                .post("/api/forcechangepassword")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  token = res.body.token ;
                  // console.log("token2:"+res.body.token);
                  // console.log(token);
                  res.should.have.status(200);
                  done();
                });
            });

            it("Old password and new password must be different!(400)", done => {
              const reqBody = {
                oldPassword: "Admmin@123",
                password: "Admmin@123",
                confirmPassword :"Admmin@123"
              };
              chai
                .request(server)
                .post("/api/forcechangepassword")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(400);
                  done();
                });
            });
        
         
          });
            // endregion ENd Force password Reset

           
        
            // region Block User
          describe("/api/users/block", () => {

            it("should return 401 Unauthorized", done => {
                 const reqBody = {
                userId: userid
              };
        
              chai
                .request(server)
                .post("/api/users/block")
                .send(reqBody)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(401);
                  done();
                });
            });
        
            it("should return 200", done => {
              const reqBody = {
                userId: userid
              };
            //  token="sfsdfsdfsdfsdfsdfsdfsdfsdfsdfdsfdfad;";
             console.log("token2"+token);
              chai
                .request(server)
                .post("/api/users/block")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(200);
                  done();
                });
            });
        
            it("should return 422 userId must be a string", done => {
              const reqBody = {
                userId: null  
              };
              chai
                .request(server)
                .post("/api/users/block")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(422);
                  done();
                });
            });
        
            it("should return 500 Cast to ObjectId failed", done => {
              const reqBody = {
                userId: "dsdsf"  
              };
              chai
                .request(server)
                .post("/api/users/block")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(500);
                  done();
                });
            });
        
            
            it("should return 400 Invalid User", done => {
              const reqBody = {
                userId: "5cbef2dd4738083ba21f1760"  
              };
              chai
                .request(server)
                .post("/api/users/block")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(400);
                  done();
                });
            });
        
         
          });
        //endregion Block User
        
           // region UnBlock User
           describe("/api/users/unblock", () => {
       
            it("should return 401 Unauthorized", done => {
              const reqBody = {
                userId: userid
              };
          
              chai
                .request(server)
                .post("/api/users/unblock")
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
                userId: userid
              };
          
              chai
                .request(server)
                .post("/api/users/unblock")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(200);
                  done();
                });
            });
        
            it("should return 422 userId must be a string", done => {
              const reqBody = {
                userId: null  
              };
              chai
                .request(server)
                .post("/api/users/unblock")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(422);
                  done();
                });
            });
        
            it("should return 500 Cast to ObjectId failed", done => {
              const reqBody = {
                userId: "dsdsf"  
              };
              chai
                .request(server)
                .post("/api/users/unblock")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(500);
                  done();
                });
            });
        
            
            it("should return 400 Invalid User", done => {
              const reqBody = {
                userId: "5cbef2dd4738083ba21f1760"  
              };
              chai
                .request(server)
                .post("/api/users/unblock")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(400);
                  done();
                });
            });
        
         
          });
        //endregion UnBlock User
        
           // region Approve User
           describe("/api/users/approveuser", () => {

            it("should return 401 Unauthorized", done => {
              const reqBody = {
                userId: importValue.userWithouDepartment
              };
            
              chai
                .request(server)
                .post("/api/users/approveuser")
                .send(reqBody)
                //.set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(401);
                  done();
                });
            });
            it("Should Return 200 Sucess", done => {
              const reqBody = {
                userId: importValue.userWithouDepartment
              };
            
              chai
                .request(server)
                .post("/api/users/approveuser")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(200);
                  done();
                });
            });

            it("You cannot approve this user!", done => {
              const reqBody = {
                userId: userid
              };
            
              chai
                .request(server)
                .post("/api/users/approveuser")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(400);
                  done();
                });
            });
        
            it("userId must be a string(422)", done => {
              const reqBody = {
                userId: null  
              };
              chai
                .request(server)
                .post("/api/users/approveuser")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(422);
                  done();
                });
            });
            it("userId is not allowed to be empty(422)", done => {
              const reqBody = {
                userId: ""  
              };
              chai
                .request(server)
                .post("/api/users/approveuser")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(422);
                  done();
                });
            });
        
            it("should return 500 Cast to ObjectId failed", done => {
              const reqBody = {
                userId: "dsdsf"  
              };
              chai
                .request(server)
                .post("/api/users/approveuser")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(500);
                  done();
                });
            });
        
            
            it("should return 400 Invalid User", done => {
              const reqBody = {
                userId: "5cbef2dd4738083ba21f1760"  
              };
              chai
                .request(server)
                .post("/api/users/unblock")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(400);
                  done();
                });
            });
        
         
          });
        //endregion Approve User
        
           // region Create User
           describe("/api/users/createuser", () => {
          
        
            it("should return 401 Unauthorized", done => {
              const reqBody = {
                name:"User Create",
                staffId:"my000289",
                email:"test265@test.com",
                password:"Admin@123",
                icNumber:"23784906876238",
                type:"AGENT",
                chatThreshold:20,
                departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"],
                customerImage:"jj"
              };
         
              chai
                .request(server)
                .post("/api/users/createuser")
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
                name:"User Create",
                staffId:"my000289",
                email:"test265@test.com",
                password:"Admin@123",
                icNumber:"23784906876238",
                type:"AGENT",
                chatThreshold:20,
                departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"],
                customerImage:"jj"
              };
         
              chai
                .request(server)
                .post("/api/users/createuser")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  //expect(res).to.be.json;
                  res.should.have.status(200);
                  done();
                });
            }); 
        
            it("should return 400 Dublicate email or staff Id", done => {
              const reqBody = {
                name:"User Create",
                staffId:"my000200",
                email:"test265@test.com",
                password:"Admin@123",
                icNumber:"23784906876238",
                type:"AGENT",
                chatThreshold:20,
                departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"],
                customerImage:"jj"
              };
           
              chai
                .request(server)
                .post("/api/users/createuser")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(400);
                  done();
                });
            });
        
            it("should return 400 Dublicate email or staff Id", done => {
              const reqBody = {
                name:"User Create",
                staffId:"my000289",
                email:"test@test.com",
                password:"Admin@123",
                icNumber:"23784906876238",
                type:"AGENT",
                chatThreshold:20,
                departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"],
                customerImage:"jj"
              };
            
              chai
                .request(server)
                .post("/api/users/createuser")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.be.json;
                  res.should.have.status(400);
                  done();
                });
            });
            it("should return 422 chatThreshold must be a number", done => {
              const reqBody = {
                name:"User Create",
                staffId:"my0002890",
                email:"test2659@test.com",
                password:"Admin@123",
                icNumber:"23784906876238",
                type:"AGENT",
                chatThreshold:"",
                departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"],
                customerImage:"jj"
              };
         
              chai
                .request(server)
                .post("/api/users/createuser")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  //expect(res).to.be.json;
                  res.should.have.status(422);
                  done();
                });
            }); 
            it("should return 422 chatThreshold must be a number", done => {
              const reqBody = {
                name:"User Create",
                staffId:"my0002890",
                email:"test2659@test.com",
                password:"Admin@123",
                icNumber:"23784906876238",
                type:"AGENT",
                chatThreshold:null,
                departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"],
                customerImage:"jj"
              };
         
              chai
                .request(server)
                .post("/api/users/createuser")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  //expect(res).to.be.json;
                  res.should.have.status(422);
                  done();
                });
            }); 
            it("should return 400 User validation failed: departments: Cast to Array failed for value \"[ { _id: 'sdsdsdd' }, { _id: 'dsdsdsdsd' } ]\" at path \"departments\"", done => {
              const reqBody = {
                name:"User Create",
                staffId:"my0002890",
                email:"test2659@test.com",
                password:"Admin@123",
                icNumber:"23784906876238",
                type:"AGENT",
                chatThreshold:20,
                departments:["sdsddsdssdsdsd","sdsdsdsdsdsd"],
                customerImage:"jj"
              };
         
              chai
                .request(server)
                .post("/api/users/createuser")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  //expect(res).to.be.json;
                  res.should.have.status(400);
                  done();
                });
            }); 

            it("should return 400 Invalid Department Id!", done => {
              const reqBody = {
                name:"User Create",
                staffId:"my0002890",
                email:"test2659@test.com",
                password:"Admin@123",
                icNumber:"23784906876238",
                type:"AGENT",
                chatThreshold:20,
                departments:["5cc2993df005376db413ad3a","5cc2993df005376db413ad3a"], // UserId sent as department Id
                customerImage:"jj"
              };
         
              chai
                .request(server)
                .post("/api/users/createuser")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  //expect(res).to.be.json;
                  res.should.have.status(400);
                  done();
                });
            }); 
            it("should return 422 staffId is not allowed to be empty", done => {
              const reqBody = {
                name:"User Create",
                staffId:"",
                email:"test265@test.com",
                password:"Admin@123",
                icNumber:"23784906876238",
                type:"AGENT",
                chatThreshold:20,
                departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"],
                customerImage:"jj"
              };
         
              chai
                .request(server)
                .post("/api/users/createuser")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  //expect(res).to.be.json;
                  res.should.have.status(422);
                  done();
                });
            }); 
            it("should return 422 staffId must be a string", done => {
              const reqBody = {
                name:"User Create",
                staffId:null,
                email:"test265@test.com",
                password:"Admin@123",
                icNumber:"23784906876238",
                type:"AGENT",
                chatThreshold:20,
                departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"],
                customerImage:"jj"
              };
         
              chai
                .request(server)
                .post("/api/users/createuser")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  //expect(res).to.be.json;
                  res.should.have.status(422);
                  done();
                });
            }); 
            it("should return 422 email must be a string", done => {
              const reqBody = {
                name:"User Create",
                staffId:"M10089",
                email:null,
                password:"Admin@123",
                icNumber:"23784906876238",
                type:"AGENT",
                chatThreshold:20,
                departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"],
                customerImage:"jj"
              };
         
              chai
                .request(server)
                .post("/api/users/createuser")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  //expect(res).to.be.json;
                  res.should.have.status(422);
                  done();
                });
            }); 
            it("should return 422 email is not allowed to be empty/email must be a valid email", done => {
              const reqBody = {
                name:"User Create",
                staffId:"M10089",
                email:"",
                password:"Admin@123",
                icNumber:"23784906876238",
                type:"AGENT",
                chatThreshold:20,
                departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"],
                customerImage:"jj"
              };
         
              chai
                .request(server)
                .post("/api/users/createuser")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  //expect(res).to.be.json;
                  res.should.have.status(422);
                  done();
                });
            }); 
            it("should return 422 email must be a valid email", done => {
              const reqBody = {
                name:"User Create",
                staffId:"M10089",
                email:"User123",
                password:"Admin@123",
                icNumber:"23784906876238",
                type:"AGENT",
                chatThreshold:20,
                departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"],
                customerImage:"jj"
              };
         
              chai
                .request(server)
                .post("/api/users/createuser")
                .send(reqBody)
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  //expect(res).to.be.json;
                  res.should.have.status(422);
                  done();
                });
            }); 
        
          });
        //endregion Create User
        
        //region update User
        describe("/api/users/updateuser", () => {
          
      
          it("should return 401 Unauthorized", done => {
            const reqBody = {
              
                id:userid,
                name:"User Create",
                staffId:"my00025",
                email:"UserUpdate@test.com",
                icNumber:"1111111111",
                type:"AGENT",
                chatThreshold:200,
                departments:[importValue.department_Id]
              
            };
        
            chai
              .request(server)
              .post("/api/users/updateuser")
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
              
                id:userid,
                name:"User Create",
                staffId:"my00025",
                email:"UserUpdate@test.com",
                icNumber:"1111111111",
                type:"AGENT",
                chatThreshold:200,
                departments:[importValue.department_Id]
              
            };
        
            chai
              .request(server)
              .post("/api/users/updateuser")
              .send(reqBody)
              .set("Authorization", `Bearer ${token}`)
              .end((err, res) => {
                expect(res).to.be.json;
                res.should.have.status(200);
                done();
              });
          });
        
          it("should return 400 Dublicate email or staff Id", done => {
          
            const reqBody = {
              id:userid,
              name:"User Create",
             // staffId:"my00025",
              staffId:"my00025",
              email:"test@test.com",
              icNumber:"1111111111",
              type:"AGENT",
              chatThreshold:200,
              departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"]
            };
          
            chai
              .request(server)
              .post("/api/users/updateuser")
              .send(reqBody)
              .set("Authorization", `Bearer ${token}`)
              .end((err, res) => {
                expect(res).to.be.json;
                res.should.have.status(400);
                done();
              });
          });
           
          it("should return 400 Dublicate email or staff Id", done => {
            const reqBody = {
              id:userid,
              name:"User Create",
             // staffId:"my00025",
              staffId:"MY0001",
              email:"UserUpdate@test.com",
              icNumber:"1111111111",
              type:"AGENT",
              chatThreshold:200,
              departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"]
            };
          
            chai
              .request(server)
              .post("/api/users/updateuser")
              .send(reqBody)
              .set("Authorization", `Bearer ${token}`)
              .end((err, res) => {
                expect(res).to.be.json;
                res.should.have.status(400);
                done();
              });
          });
        
          it("should return 400 Invalid User", done => {
            const reqBody = {
          
                id:"5cbef2dd4738083ba21f1790",
                name:"User Create",
                staffId:"MY00029",
                email:"tesfdt@test.com",
                icNumber:"1111111111",
                type:"AGENT",
                chatThreshold:200,
                departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"]
            
            };
          
            chai
              .request(server)
              .post("/api/users/updateuser")
              .send(reqBody)
              .set("Authorization", `Bearer ${token}`)
              .end((err, res) => {
                expect(res).to.be.json;
                res.should.have.status(400);
                done();
              });
          });
        
          it("should return 400 Invalid User", done => {
            const reqBody = {
              id:userid,
              name:"User Create",
              staffId:"my0002",
              email:"testunapproved@test.com",
              icNumber:"1111111111",
              type:"AGENT",
              chatThreshold:200,
              departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"]
            };
          
            chai
              .request(server)
              .post("/api/users/updateuser")
              .send(reqBody)
              .set("Authorization", `Bearer ${token}`)
              .end((err, res) => {
                expect(res).to.be.json;
                res.should.have.status(400);
                done();
              });
          });
          it("should return 422 staffId must be a string", done => {
            const reqBody = {
              id:userid,
              name:"User Create",
              staffId:null,
              email:"testunapproved@test.com",
              icNumber:"1111111111",
              type:"AGENT",
              chatThreshold:200,
              departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"]
            };
          
            chai
              .request(server)
              .post("/api/users/updateuser")
              .send(reqBody)
              .set("Authorization", `Bearer ${token}`)
              .end((err, res) => {
                expect(res).to.be.json;
                res.should.have.status(422);
                done();
              });
          });
          it("should return 422 staffId is not allowed to be empty", done => {
            const reqBody = {
              id:userid,
              name:"User Create",
              staffId:"",
              email:"testunapproved@test.com",
              icNumber:"1111111111",
              type:"AGENT",
              chatThreshold:200,
              departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"]
            };
          
            chai
              .request(server)
              .post("/api/users/updateuser")
              .send(reqBody)
              .set("Authorization", `Bearer ${token}`)
              .end((err, res) => {
                expect(res).to.be.json;
                res.should.have.status(422);
                done();
              });
          });
          it("should return 422 email must be a string", done => {
            const reqBody = {
              id:userid,
              name:"User Create",
              staffId:"M102932",
              email:null,
              icNumber:"1111111111",
              type:"AGENT",
              chatThreshold:200,
              departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"]
            };
          
            chai
              .request(server)
              .post("/api/users/updateuser")
              .send(reqBody)
              .set("Authorization", `Bearer ${token}`)
              .end((err, res) => {
                expect(res).to.be.json;
                res.should.have.status(422);
                done();
              });
          });
          it("should return 422 email is not allowed to be empty", done => {
            const reqBody = {
              id:userid,
              name:"User Create",
              staffId:"M102932",
              email:"",
              icNumber:"1111111111",
              type:"AGENT",
              chatThreshold:200,
              departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"]
            };
          
            chai
              .request(server)
              .post("/api/users/updateuser")
              .send(reqBody)
              .set("Authorization", `Bearer ${token}`)
              .end((err, res) => {
                expect(res).to.be.json;
                res.should.have.status(422);
                done();
              });
          });
          it("should return 422 email must be a valid email", done => {
            const reqBody = {
              id:userid,
              name:"User Create",
              staffId:"M102932",
              email:"sdsdsdsd",
              icNumber:"1111111111",
              type:"AGENT",
              chatThreshold:200,
              departments:["5ca97678c44ccd212c9ed53f","5ca97678c44ccd212c9ed547"]
            };
          
            chai
              .request(server)
              .post("/api/users/updateuser")
              .send(reqBody)
              .set("Authorization", `Bearer ${token}`)
              .end((err, res) => {
                expect(res).to.be.json;
                res.should.have.status(422);
                done();
              });
          });
        
        });
        //endregion update User
        
        //region Datatable 
        describe("/api/users/datatable", () => {
          
          it("should return 401 Unauthorized", done => {
            const reqBody = {
              
              take: 10,
              skip: 0,
              sort: [{
                field: "email",
                dir: "asc"
              }],
              filter: {
                logic: "and",
                filters: []
              }
              
            };
        
            chai
              .request(server)
              .post("/api/users/datatable")
              .send(reqBody)
              //.set("Authorization", `Bearer ${token}`)
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
                field: "email",
                dir: "asc"
              }],
              filter: {
                logic: "and",
                filters: []
              }
              
            };
        
            chai
              .request(server)
              .post("/api/users/datatable")
              .send(reqBody)
              .set("Authorization", `Bearer ${token}`)
              .end((err, res) => {
                expect(res).to.be.json;
                res.should.have.status(200);
                done();
              });
          });
          it("should return 200 -take 1", done => {
            const reqBody = {
              
              take: 1,
              skip: 0,
              sort: [{
                field: "email",
                dir: "asc"
              }],
              filter: {
                logic: "and",
                filters: []
              }
              
            };
        
            chai
              .request(server)
              .post("/api/users/datatable")
              .send(reqBody)
              .set("Authorization", `Bearer ${token}`)
              .end((err, res) => {
                expect(res).to.be.json;
                res.should.have.status(200);
                expect(Object.keys(res.body.data)).to.have.length(1);
                done();
              });
          });
        
        
        
        });

             //region changepassword
        
        
             describe("/api/changepassword/", () => {
        
           
        
              it("should return 401 Unauthorized", done => {
                const reqBody = {
                  oldPassword: resetpasswordUserId,
                  password: "Password",
                  confirmPassword :"Password"
                };
                chai
                  .request(server)
                  .post("/api/changepassword")
                  .send(reqBody)
                  .end((err, res) => {
                    res.should.have.status(401);
                    done();
                  });
              });
          
              it("Invalid Old Password!", done => {
                const reqBody = {
                  oldPassword: "sad",
                  password: "P@ssword1",
                  confirmPassword :"P@ssword1"
                };
                chai
                  .request(server)
                  .post("/api/changepassword")
                  .send(reqBody)
                  .set("Authorization", `Bearer ${token}`)
                  .end((err, res) => {
                    expect(res).to.be.json;
                    res.should.have.status(400);
                    done();
                  });
              });
            
              it("should return 200", done => {
                const reqBody = {
                  oldPassword: "Admmin@123",
                  password: "Admmin@1234",
                  confirmPassword :"Admmin@1234"
                };
                chai
                  .request(server)
                  .post("/api/changepassword")
                  .send(reqBody)
                  .set("Authorization", `Bearer ${token}`)
                  .end((err, res) => {
                    expect(res).to.be.json;
                    token = res.body.token ;
                    // console.log("token2:"+res.body.token);
                    // console.log(token);
                    res.should.have.status(200);
                    done();
                  });
              });
  
              it("Old password and new password must be different!(400)", done => {
                const reqBody = {
                  oldPassword: "Admmin@1234",
                  password: "Admmin@1234",
                  confirmPassword :"Admmin@1234 "
                };
                chai
                  .request(server)
                  .post("/api/changepassword")
                  .send(reqBody)
                  .set("Authorization", `Bearer ${token}`)
                  .end((err, res) => {
                    expect(res).to.be.json;
                    res.should.have.status(400);
                    done();
                  });
              });

              it("password with value Password1 fails to match the required pattern(422)", done => {
                const reqBody = {
                  oldPassword: "Admmin@1234",
                  password: "Password1",
                  confirmPassword :"Password1"
                };
                chai
                  .request(server)
                  .post("/api/changepassword")
                  .send(reqBody)
                  .set("Authorization", `Bearer ${token}`)
                  .end((err, res) => {
                    expect(res).to.be.json;
                    res.should.have.status(422);
                    done();
                  });
              });

              it("confirmPassword and password must be matched(422)", done => {
                const reqBody = {
                  oldPassword: "Admmin@1234",
                  password: "Passwor",
                  confirmPassword :"Passwodrr"
                };
                chai
                  .request(server)
                  .post("/api/changepassword")
                  .send(reqBody)
                  .set("Authorization", `Bearer ${token}`)
                  .end((err, res) => {
                    expect(res).to.be.json;
                    res.should.have.status(422);
                    done();
                  });
              });
          
           
            });
              // endregion changepassword
})

