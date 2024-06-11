//During the test the env variable is set to test
const bcrypt = require('bcryptjs')

//Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
let server = require('../../api')
// const express = require("../../config/expressconfig.js");
// var app = express();
// var http = require("http");
// var server = http.createServer(app);
const mongoose = require('mongoose')
const should = chai.should()
const expect = chai.expect
//mongoose.Promise=global.Promise;
const User = require('../../models/user')
const Department = require('../../models/department')
const Customer = require('../../models/customer')
const Chats = require('../../models/chat')
const ChatHistory = require('../../models/chatHistory')
chai.use(chaiHttp)
var token,
  userid,
  resetpasswordUserId,
  departmantId,
  userIdWithoutDepartment,
  customerId,
  chatId,
  agentId

module.exports = {
  ddd: 'kllkjkl'
}
//Our parent block
describe('migration', () => {
  before(async () => {
    await Department.deleteMany()
    await User.deleteMany()
    await Customer.deleteMany()
    await Chats.deleteMany()
    await ChatHistory.deleteMany()
    //beforeEach(async () => {
    const department = new Department({
      name: 'Test Department',
      code: 'GASDGJ',
      displayName: 'Test Display Department',
      openingDetails: [
        {
          day: 'Monday',
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: 'Tuesday',
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: 'Wednesday',
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: 'Thursday',
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: 'Friday',
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: 'Saturday',
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: 'Sunday',
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        }
      ],
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
      channels: [
        {
          code: 'WEB'
        }
      ],
      chatSetting: {
        closeTime: 15,
        uniqueIdentifier: 'EMAIL'
      },
      offlineFormEmail: 'chatbox@grr.la',
      offlineFormMessage: 'Test Message',
      status: 'ACTIVE',
      isBlocked: false
    })
    department.save()

    departmantId = department._id
    module.exports.department_Id = departmantId

    const department2 = new Department({
      name: 'Test Department2',
      code: 'TESTCODE',
      displayName: 'Test Display Department',
      openingDetails: [
        {
          day: 'Monday',
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: 'Tuesday',
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: 'Wednesday',
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: 'Thursday',
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: 'Friday',
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: 'Saturday',
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        },
        {
          day: 'Sunday',
          openingTime: 400,
          closingTime: 1080,
          isActive: true
        }
      ],
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
      channels: [
        {
          code: 'WEB'
        }
      ],
      chatSetting: {
        closeTime: 15,
        uniqueIdentifier: 'EMAIL'
      },
      offlineFormEmail: 'chatbox@grr.la',
      offlineFormMessage: 'Test Message',
      status: 'ACTIVE',
      isBlocked: false
    })
    department2.save()
    module.exports.department_Code = department2.code

    let user = new User({
      name: 'Test AgentNEW',
      status: 'Active',
      staffId: 'MY0001',
      email: 'test@test.com',
      password: bcrypt.hashSync('Password', 10),
      picture: '',
      chatThreshold: 10,
      type: 'AGENT',
      status: 'APPROVED',
      isBlocked: false,
      forceChangePassword: false,
      chatThreshold: 200,
      departments: [
        {
          _id: department._id
        }
      ]
    })
    user.save()
    agentId = user._id
    let userBlocked = new User({
      name: 'Test AgentBlocked',
      status: 'Active',
      staffId: 'MY0002',
      email: 'testblock@test.com',
      password: bcrypt.hashSync('Password', 10),
      picture: '',
      chatThreshold: 10,
      type: 'AGENT',
      status: 'APPROVED',
      isBlocked: true,
      forceChangePassword: false,
      chatThreshold: 200,
      departments: [
        {
          _id: department._id
        }
      ]
    })
    userBlocked.save()
    let userWithoutDepartment = new User({
      name: 'Test Agentverified',
      status: 'Active',
      staffId: 'MY0003',
      email: 'testunapproved@test.com',
      password: bcrypt.hashSync('Password', 10),
      picture: '',
      chatThreshold: 10,
      type: 'AGENT',
      status: 'VERIFIED',
      isBlocked: false,
      forceChangePassword: false,
      chatThreshold: 200,
      modifiedBy: '5ccbc213cff4ee6dfda90bb3',
      modifiedDate: new Date()
      // departments: [
      //   {
      //     _id: department._id
      //   }
      // ]
    })
    userWithoutDepartment.save()
    userIdWithoutDepartment = userWithoutDepartment._id
    module.exports.userWithouDepartment = userIdWithoutDepartment

    let userNotApproved = new User({
      name: 'Test Agentverifiedxyz',
      status: 'Active',
      staffId: 'MY0004',
      email: 'unapproves@test.com',
      password: bcrypt.hashSync('Password', 10),
      picture: '',
      chatThreshold: 10,
      type: 'AGENT',
      status: 'VERIFIED',
      isBlocked: false,
      forceChangePassword: false,
      chatThreshold: 200,
      modifiedBy: '5ccbc213cff4ee6dfda90bb3',
      modifiedDate: new Date(),
      departments: [
        {
          _id: department._id
        }
      ]
    })
    userNotApproved.save()

    let userTest = new User({
      name: 'Test AgentNEW',
      status: 'Active',
      staffId: 'MY0006',
      email: 'test6@test.com',
      password: bcrypt.hashSync('Password', 10),
      picture: '',
      chatThreshold: 10,
      type: 'AGENT',
      status: 'APPROVED',
      isBlocked: false,
      forceChangePassword: false,
      chatThreshold: 200,
      departments: [
        {
          _id: department._id
        }
      ]
    })
    userTest.save()

    let customer = new Customer({
      name: 'testCustomer',
      email: 'test45@grr.la',
      mobileNumber: '98412323334'
    })
    customer.save()
    customerId = customer._id
    module.exports.customer_Id = customerId

    let chats = new Chats({
      agent: agentId,
      agentSessionId: '5c9c5b2c78866a8458170633',
      customer: customerId,
      customerSessionId: '5c9c5b2c78866a8458170456',
      startTime: '1553954655',
      requestIP: '::1',
      channelCode: 'WEBCHAToooER',
      department: departmantId,
      agentName: 'Test AgentNEW',
      departmentName: 'Test Department2',
      departmentCode: 'TESTCODE'

      // departmentCode:""
    })

    chats.save()
    chatId = chats._id
    module.exports.chat_Id = chatId

    //});
  })
  describe('/api/login', () => {
    it('should login user', done => {
      const user = {
        staffId: 'my0001',
        password: 'Password',
        sourcePortal: 'AGENT'
      }
      chai
        .request(server)
        .post('/api/login')
        .send(user)
        .end((err, res) => {
          expect(res).to.be.json
          token = res.body.token
          userid = res.body.id
          resetpasswordUserId = res.body.id
          res.should.have.status(200)
          done()
        })
    })
  })
  // after(async () => {

  //   mongoose.connection.close();
  //   server.close();
  // });
})
