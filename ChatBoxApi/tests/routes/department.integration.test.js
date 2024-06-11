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
//departmentId=importValue.department_Id;

 


    

describe("Department", () => {
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
        done();
      });
  });

  describe("/api/department/findbydepartmentcode", () => {
  
    it("should return 401 Unauthorized", done => {
      const reqBody = {
        code: "GASDGJ"
      };
 
      chai
        .request(server)
        .post("/api/department/findbydepartmentcode")
       // .set("Authorization", `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it("should return 200", done => {
      const reqBody = {
        code: "GASDGJ"
      };
 
      chai
        .request(server)
        .post("/api/department/findbydepartmentcode")
        .set("Authorization", `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("No active Departments", done => {
      const reqBody = {
        code: "NoActiveDepartmet"
      };
 
      chai
        .request(server)
        .post("/api/department/findbydepartmentcode")
        .set("Authorization", `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("code must be a string", done => {
      const reqBody = {
        code: null
      };
 
      chai
        .request(server)
        .post("/api/department/findbydepartmentcode")
        .set("Authorization", `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });

    it("code is not allowed to be empty", done => {
      const reqBody = {
        code: ""
      };
 
      chai
        .request(server)
        .post("/api/department/findbydepartmentcode")
        .set("Authorization", `Bearer ${token}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });
  

    
});

describe("/api/department/list", () => {
  

  it("should return 401 Unauthorized", done => {
   

    chai
      .request(server)
      .get("/api/department/list")
      //.set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it("should return 200", done => {
   

    chai
      .request(server)
      .get("/api/department/list")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });




  
});

describe("/api/department/getbyid", () => {
  

  it("should return 401 Unauthorized", done => {
   

    chai
      .request(server)
      .get("/api/department/getbyid/"+importValue.department_Id)
     // .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it("should return 200", done => {
   

    chai
      .request(server)
      .get("/api/department/getbyid/"+importValue.department_Id)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });




  
});

describe("/api/department/datatable", () => {
  
  it("should return 401 Unauthorized", done => {
    const reqBody = {
      take: 10,
      skip: 0,
      sort: [],
      filter: {}
    };

    chai
      .request(server)
      .post("/api/department/datatable/")
     // .set("Authorization", `Bearer ${token}`)
      .send(reqBody)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it("should return 200", done => {
    const reqBody = {
      take: 10,
      skip: 0,
      sort: [],
      filter: {}
    };

    chai
      .request(server)
      .post("/api/department/datatable/")
      .set("Authorization", `Bearer ${token}`)
      .send(reqBody)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should return 200-take 1", done => {
    const reqBody = {
      take: 1,
      skip: 0,
      sort: [],
      filter: {}
    };

    chai
      .request(server)
      .post("/api/department/datatable/")
      .set("Authorization", `Bearer ${token}`)
      .send(reqBody)
      .end((err, res) => {
        res.should.have.status(200);
        expect(Object.keys(res.body.data)).to.have.length(1);
        done();
      });
  });




  
});

describe("/api/department/create", () => {
  
  it("should return 401", done => {
    const reqBody = {
      name: "test",
      displayName:"test",
      code: importValue.code,//autogenerated while creating department from service 
      channels: [{
      code: "WEB"
      },
      {
        code: "WEB"
      }],
      preChatForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineFormMessage: "ajshdkad",
      offlineFormEmail: "chatbox@grr.la",
      chatSetting: {
        closeTime: 10,
        uniqueIdentifier: "EMAIL"
      },
      openingDetails: [{
          day: "Monday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Tuesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Wednesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Thursday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Friday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Saturday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Sunday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        }
      ]
    };

    chai
      .request(server)
      .post("/api/department/create/")
      //.set("Authorization", `Bearer ${token}`)
      .send(reqBody)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it("should return 200", done => {
    const reqBody = {
      name: "test",
      displayName:"test",
      code: importValue.code,//autogenerated while creating department from service 
      channels: [{
      code: "WEB"
      },
      {
        code: "WEB"
      }],
      preChatForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineFormMessage: "ajshdkad",
      offlineFormEmail: "chatbox@grr.la",
      chatSetting: {
        closeTime: 10,
        uniqueIdentifier: "EMAIL"
      },
      openingDetails: [{
          day: "Monday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Tuesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Wednesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Thursday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Friday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Saturday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Sunday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        }
      ]
    };

    chai
      .request(server)
      .post("/api/department/create/")
      .set("Authorization", `Bearer ${token}`)
      .send(reqBody)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("should return 422 offlineFormEmail must be a valid email", done => {
    const reqBody = {
      name: "test",
      displayName:"test",
      code: importValue.code,//autogenerated while creating department from service 
      channels: [{
      code: "WEB"
      },
      {
        code: "WEB"
      }],
      preChatForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineFormMessage: "ajshdkad",
      offlineFormEmail: "chgrr.la",
      chatSetting: {
        closeTime: 10,
        uniqueIdentifier: "EMAIL"
      },
      openingDetails: [{
          day: "Monday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Tuesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Wednesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Thursday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Friday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Saturday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Sunday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        }
      ]
    };

    chai
      .request(server)
      .post("/api/department/create/")
      .set("Authorization", `Bearer ${token}`)
      .send(reqBody)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });
  it("should return 422 offlineFormEmail must be a string", done => {
    const reqBody = {
      name: "test",
      displayName:"test",
      code: importValue.code,//autogenerated while creating department from service 
      channels: [{
      code: "WEB"
      },
      {
        code: "WEB"
      }],
      preChatForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineFormMessage: "ajshdkad",
      offlineFormEmail: null,
      chatSetting: {
        closeTime: 10,
        uniqueIdentifier: "EMAIL"
      },
      openingDetails: [{
          day: "Monday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Tuesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Wednesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Thursday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Friday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Saturday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Sunday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        }
      ]
    };

    chai
      .request(server)
      .post("/api/department/create/")
      .set("Authorization", `Bearer ${token}`)
      .send(reqBody)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });
  it("should return 422 closeTime must be a number", done => {
    const reqBody = {
      name: "test",
      displayName:"test",
      code: importValue.code,//autogenerated while creating department from service 
      channels: [{
      code: "WEB"
      },
      {
        code: "WEB"
      }],
      preChatForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineFormMessage: "ajshdkad",
      offlineFormEmail: "test@gmail.com",
      chatSetting: {
        closeTime: null,
        uniqueIdentifier: "EMAIL"
      },
      openingDetails: [{
          day: "Monday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Tuesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Wednesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Thursday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Friday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Saturday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Sunday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        }
      ]
    };

    chai
      .request(server)
      .post("/api/department/create/")
      .set("Authorization", `Bearer ${token}`)
      .send(reqBody)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });
  it("should return 422 name is not allowed to be empty", done => {
    const reqBody = {
      name: "",
      displayName:"test",
      code: importValue.code,//autogenerated while creating department from service 
      channels: [{
      code: "WEB"
      },
      {
        code: "WEB"
      }],
      preChatForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineFormMessage: "ajshdkad",
      offlineFormEmail: "hello@gmail.com",
      chatSetting: {
        closeTime: 20,
        uniqueIdentifier: "EMAIL"
      },
      openingDetails: [{
          day: "Monday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Tuesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Wednesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Thursday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Friday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Saturday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Sunday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        }
      ]
    };

    chai
      .request(server)
      .post("/api/department/create/")
      .set("Authorization", `Bearer ${token}`)
      .send(reqBody)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });
  it("should return 422 displayName is not allowed to be empty", done => {
    const reqBody = {
      name: "sdsdsdsd",
      displayName:"",
      code: importValue.code,//code is autogenerated while creating department from service 
      channels: [{
      code: "WEB"
      },
      {
        code: "WEB"
      }],
      preChatForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineFormMessage: "ajshdkad",
      offlineFormEmail: "test@gmail.com",
      chatSetting: {
        closeTime: 20,
        uniqueIdentifier: "EMAIL"
      },
      openingDetails: [{
          day: "Monday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Tuesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Wednesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Thursday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Friday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Saturday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Sunday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        }
      ]
    };

    chai
      .request(server)
      .post("/api/department/create/")
      .set("Authorization", `Bearer ${token}`)
      .send(reqBody)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });
  it("should return 422 day is not allowed to be empt /openingTime must be a number/closingTime must be a number", done => {
    const reqBody = {
      name: "sdsdsdsd",
      displayName:"test",
      code: importValue.code,//code is autogenerated while creating department from service 
      channels: [{
      code: "WEB"
      },
      {
        code: "WEB"
      }],
      preChatForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineFormMessage: "ajshdkad",
      offlineFormEmail: "test@gmail.com",
      chatSetting: {
        closeTime: 20,
        uniqueIdentifier: "EMAIL"
      },
      openingDetails: [{
          day: "",
          openingTime: null,
          closingTime: null,
          isActive: true
        },
        {
          day: "Tuesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Wednesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Thursday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Friday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Saturday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Sunday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        }
      ]
    };

    chai
      .request(server)
      .post("/api/department/create/")
      .set("Authorization", `Bearer ${token}`)
      .send(reqBody)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });

});

describe("/api/department/update", () => {
  it("should return 401 Unauthorized", done => {
    const reqBody = {
      id:importValue.department_Id,
      name: "test",
      displayName:"test",
      code: "testUPDATE",
      channels: [{
      code: "WEB"
      },
      {
        code: "WEB"
      }],
      preChatForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineFormMessage: "ajshdkad",
      offlineFormEmail: "chatbox@grr.la",
      chatSetting: {
        closeTime: 10,
        uniqueIdentifier: "EMAIL"
      },
      openingDetails: [{
          day: "Monday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Tuesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Wednesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Thursday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Friday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Saturday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Sunday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        }
      ]
    };

    chai
      .request(server)
      .post("/api/department/update/")
     // .set("Authorization", `Bearer ${token}`)
      .send(reqBody)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it("should return 200", done => {
    const reqBody = {
      id:importValue.department_Id,
      name: "test",
      displayName:"test",
      code: "testUPDATE",
      channels: [{
      code: "WEB"
      },
      {
        code: "WEB"
      }],
      preChatForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineFormMessage: "ajshdkad",
      offlineFormEmail: "chatbox@grr.la",
      chatSetting: {
        closeTime: 10,
        uniqueIdentifier: "EMAIL"
      },
      openingDetails: [{
          day: "Monday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Tuesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Wednesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Thursday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Friday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Saturday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Sunday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        }
      ]
    };

    chai
      .request(server)
      .post("/api/department/update/")
      .set("Authorization", `Bearer ${token}`)
      .send(reqBody)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should return 422 offlineFormEmail must be a valid email", done => {
    const reqBody = {
      
      id:importValue.department_Id,
      name: "test",
      displayName:"test",
      code: importValue.code,//autogenerated while creating department from service 
      channels: [{
      code: "WEB"
      },
      {
        code: "WEB"
      }],
      preChatForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineFormMessage: "ajshdkad",
      offlineFormEmail: "chgrr.la",
      chatSetting: {
        closeTime: 10,
        uniqueIdentifier: "EMAIL"
      },
      openingDetails: [{
          day: "Monday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Tuesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Wednesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Thursday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Friday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Saturday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Sunday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        }
      ]
    };

    chai
      .request(server)
      .post("/api/department/create/")
      .set("Authorization", `Bearer ${token}`)
      .send(reqBody)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });

  it("should return 422 offlineFormEmail must be a string", done => {
    const reqBody = {
      id:importValue.department_Id,
      name: "test",
      displayName:"test",
      code: importValue.code,//autogenerated while creating department from service 
      channels: [{
      code: "WEB"
      },
      {
        code: "WEB"
      }],
      preChatForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineFormMessage: "ajshdkad",
      offlineFormEmail: null,
      chatSetting: {
        closeTime: 10,
        uniqueIdentifier: "EMAIL"
      },
      openingDetails: [{
          day: "Monday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Tuesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Wednesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Thursday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Friday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Saturday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Sunday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        }
      ]
    };

    chai
      .request(server)
      .post("/api/department/create/")
      .set("Authorization", `Bearer ${token}`)
      .send(reqBody)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });
 
  it("should return 422 closeTime must be a number", done => {
    const reqBody = {
      id:importValue.department_Id,
      name: "test",
      displayName:"test",
      code: importValue.code,//autogenerated while creating department from service 
      channels: [{
      code: "WEB"
      },
      {
        code: "WEB"
      }],
      preChatForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineFormMessage: "ajshdkad",
      offlineFormEmail: "test@gmail.com",
      chatSetting: {
        closeTime: null,
        uniqueIdentifier: "EMAIL"
      },
      openingDetails: [{
          day: "Monday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Tuesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Wednesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Thursday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Friday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Saturday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Sunday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        }
      ]
    };

    chai
      .request(server)
      .post("/api/department/create/")
      .set("Authorization", `Bearer ${token}`)
      .send(reqBody)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });
  it("should return 422 name is not allowed to be empty", done => {
    const reqBody = {
      id:importValue.department_Id,
      name: "",
      displayName:"test",
      code: importValue.code,//autogenerated while creating department from service 
      channels: [{
      code: "WEB"
      },
      {
        code: "WEB"
      }],
      preChatForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineFormMessage: "ajshdkad",
      offlineFormEmail: "hello@gmail.com",
      chatSetting: {
        closeTime: 20,
        uniqueIdentifier: "EMAIL"
      },
      openingDetails: [{
          day: "Monday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Tuesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Wednesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Thursday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Friday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Saturday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Sunday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        }
      ]
    };

    chai
      .request(server)
      .post("/api/department/create/")
      .set("Authorization", `Bearer ${token}`)
      .send(reqBody)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });
  it("should return 422 displayName is not allowed to be empty", done => {
    const reqBody = {
      id:importValue.department_Id,
      name: "sdsdsdsd",
      displayName:"",
      code: importValue.code,//code is autogenerated while creating department from service 
      channels: [{
      code: "WEB"
      },
      {
        code: "WEB"
      }],
      preChatForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineFormMessage: "ajshdkad",
      offlineFormEmail: "test@gmail.com",
      chatSetting: {
        closeTime: 20,
        uniqueIdentifier: "EMAIL"
      },
      openingDetails: [{
          day: "Monday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Tuesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Wednesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Thursday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Friday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Saturday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Sunday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        }
      ]
    };

    chai
      .request(server)
      .post("/api/department/create/")
      .set("Authorization", `Bearer ${token}`)
      .send(reqBody)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });
  it("should return 422 day is not allowed to be empt /openingTime must be a number/closingTime must be a number", done => {
    const reqBody = {
      id:importValue.department_Id,
      name: "sdsdsdsd",
      displayName:"test",
      code: importValue.code,//code is autogenerated while creating department from service 
      channels: [{
      code: "WEB"
      },
      {
        code: "WEB"
      }],
      preChatForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineForm: {
        isRequired: true,
        isEmailRequired: true,
        isNameRequired: true,
        isMobileNumberRequired: true,
        name: true,
        email: true,
        mobile: true
      },
      offlineFormMessage: "ajshdkad",
      offlineFormEmail: "test@gmail.com",
      chatSetting: {
        closeTime: 20,
        uniqueIdentifier: "EMAIL"
      },
      openingDetails: [{
          day: "",
          openingTime: null,
          closingTime: null,
          isActive: true
        },
        {
          day: "Tuesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Wednesday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Thursday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Friday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Saturday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: "Sunday",
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        }
      ]
    };

    chai
      .request(server)
      .post("/api/department/create/")
      .set("Authorization", `Bearer ${token}`)
      .send(reqBody)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });

 

  
});

describe("/api/department/block", () => {
  
  it("should return 401 Unauthorized", done => {
    const reqBody = {
      departmentId: importValue.department_Id
    };

    chai
      .request(server)
      .post("/api/department/block")
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
      departmentId: importValue.department_Id
    };

    chai
      .request(server)
      .post("/api/department/block")
      .send(reqBody)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.be.json;
        res.should.have.status(200);
        done();
      });
  });

  it("should return 422 departmentId is not allowed to be empty", done => {
    const reqBody = {
      departmentId: ""  
    };
    chai
      .request(server)
      .post("/api/department/block")
      .send(reqBody)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.be.json;
        res.should.have.status(422);
        done();
      });
  });
  it("should return 422 departmentId must be a string", done => {
    const reqBody = {
      departmentId: null  
    };
    chai
      .request(server)
      .post("/api/department/block")
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
      departmentId: "dsdsf"  
    };
    chai
      .request(server)
      .post("/api/department/block")
      .send(reqBody)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.be.json;
        res.should.have.status(500);
        done();
      });
  });

});

describe("/api/department/unblock", () => {
  
  it("should return 401 Unauthorized", done => {
    const reqBody = {
      departmentId: importValue.department_Id
    };

    chai
      .request(server)
      .post("/api/department/unblock")
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
      departmentId: importValue.department_Id
    };

    chai
      .request(server)
      .post("/api/department/unblock")
      .send(reqBody)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.be.json;
        res.should.have.status(200);
        done();
      });
  });

  it("should return 422 departmentId is not allowed to be empty", done => {
    const reqBody = {
      departmentId: ""  
    };
    chai
      .request(server)
      .post("/api/department/unblock")
      .send(reqBody)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.be.json;
        res.should.have.status(422);
        done();
      });
  });
  it("should return 422 departmentId must be a string", done => {
    const reqBody = {
      departmentId: null  
    };
    chai
      .request(server)
      .post("/api/department/unblock")
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
      departmentId: "dsdsf"  
    };
    chai
      .request(server)
      .post("/api/department/unblock")
      .send(reqBody)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.be.json;
        res.should.have.status(500);
        done();
      });
  });

});

});

