require('custom-env').env(true, process.cwd() + '//')
const Department = require('../models/department')
const User = require('../models/user')
const mongoose = require('mongoose')
const Fawn = require('fawn')
const bcrypt = require('bcryptjs')

const isProd = process.env.APP_ENV === 'prod'

Fawn.init(mongoose)
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useCreateIndex: true,
  useNewUrlParser: true
})

const department = new Department({
  name: 'TEST DEPARTMENT',
  code: 'GASDGJ',
  displayName: 'TEST DEPARTMENT',
  announcementBanner: 'Please do not share confidential data.',
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

const department2 = new Department({
  announcementBanner: 'Please do not share confidential data.',
  name: 'TEST DEPARTMENT 2',
  code: 'GASDGHH',
  displayName: 'TEST DEPARTMENT 2',
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
    },
    {
      code: 'APP'
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

const user = new User({
  name: 'Test Agent',
  status: 'Active',
  staffId: 'MY0001',
  email: 'test@test.com',
  password: bcrypt.hashSync('Password', 10),
  picture: '',
  type: 'AGENT',
  status: 'APPROVED',
  isBlocked: false,
  forceChangePassword: false,
  chatThreshold: 200,
  icNumber: '123123123123',
  departments: [
    {
      _id: department._id
    }
  ]
})

const user2 = new User({
  name: 'Test Agent 2',
  status: 'Active',
  staffId: 'MY0002',
  email: 'test2@test.com',
  password: bcrypt.hashSync('Password', 10),
  picture: '',
  chatThreshold: 10,
  type: 'AGENT',
  status: 'APPROVED',
  isBlocked: false,
  forceChangePassword: true,
  icNumber: '123123123123',
  chatThreshold: 200,
  departments: [
    {
      _id: department._id
    }
  ]
})
const user3 = new User({
  name: 'Test Agent 3',
  status: 'Active',
  staffId: 'MY0003',
  email: 'test3@test.com',
  password: bcrypt.hashSync('Password', 10),
  picture: '',
  type: 'AGENT',
  status: 'APPROVED',
  isBlocked: false,
  forceChangePassword: false,
  icNumber: '123123123123',
  chatThreshold: 200,
  departments: [
    {
      _id: department2._id
    }
  ]
})

const user4 = new User({
  name: 'Test Admin',
  status: 'Active',
  staffId: 'MY0000',
  email: 'admin@8squarei.com',
  password: bcrypt.hashSync('Admin@123', 10),
  picture: '',
  type: 'ADMIN',
  status: 'APPROVED',
  isBlocked: false,
  forceChangePassword: false,
  icNumber: '123123123123',
  chatThreshold: 0,
  departments: []
})

const user5 = new User({
  name: 'Test Admin 1',
  status: 'Active',
  staffId: 'ADMIN',
  email: 'admin1@8square.com',
  password: bcrypt.hashSync('Admin@123', 10),
  picture: '',
  type: 'ADMIN',
  status: 'APPROVED',
  isBlocked: false,
  forceChangePassword: false,
  icNumber: '123123123123',
  chatThreshold: 0,
  departments: []
})

if (isProd) {
  new Fawn.Task()
    .save('users', user4)
    .run()
    .then(function(results) {
      mongoose.disconnect()
    })
} else {
  new Fawn.Task()
    .save('departments', department)
    .save('departments', department2)
    .save('users', user)
    .save('users', user2)
    .save('users', user3)
    .save('users', user4)
    .save('users', user5)
    .run()
    .then(function(results) {
      mongoose.disconnect()
    })
}

/*
use chatbox;
db.system.js.save({_id:"fn_year_month",value:function () {
  var date  = new ISODate();
  var str   = date.toISOString();
  var year  = str.substring(0, 4);
  var month = str.substring(5, 7);
  return year+""+month;
}});


db.system.js.save({_id:"fn_pad_with_zeroes",value: function (number, length) {
  var my_string = '' + number;
  while (my_string.length < length) {
      my_string = '0' + my_string;
  }
  return my_string;
}});

db.system.js.save({_id:"fn_getnextsequencevalue",value: function (sequencename){
  var l_sequenceval = db.counters.findAndModify({
     query: {_id: sequencename },
     update: {$inc:{sequence_value:1}},
     new:true
  });
  return fn_year_month()+""+fn_pad_with_zeroes(l_sequenceval.sequence_value,6);
}});
 */

// Functions

// mongoose.connection.db.system.js.save({_id:"fn_year_month",value:function () {
//   var date  = new ISODate();
//   var str   = date.toISOString();
//   var year  = str.substring(0, 4);
//   var month = str.substring(5, 7);
//   return year+""+month;
// }})

// db.system.js.save({_id:"fn_pad_with_zeroes",value: function (number, length) {
//   var my_string = '' + number;
//   while (my_string.length < length) {
//       my_string = '0' + my_string;
//   }
//   return my_string;
// }})

// db.system.js.save({_id:"fn_getnextsequencevalue",value: function (sequencename){
//   var l_sequenceval = db.counters.findAndModify({
//      query: {_id: sequencename },
//      update: {$inc:{sequence_value:1}},
//      new:true
//   });
//   return fn_year_month()+""+fn_pad_with_zeroes(l_sequenceval.sequence_value,6);
// }})
