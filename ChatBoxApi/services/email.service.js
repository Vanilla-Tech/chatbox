const db = require('../mongo/db')
const nodeMailer = require('nodemailer')
var ejs = require('ejs')

const Department = db.Department
const OfflineMessage = db.OfflineMessage

var smtpConfig = {}

if (process.env.SMTP_AUTH === 'ALLOW') {
  smtpConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'SECURE',
    auth: {
      user: process.env.SMTP_USER, // Your email id
      pass: process.env.SMTP_PASS // Your password
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  }
} else {
  smtpConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'SECURE',
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  }
}

module.exports = {
  offlineMessageSchema,
  createAccountEmail,
  resetPassword,
  resetPasswordSuccess
}

async function offlineMessageSchema(req) {
  try {
    const department = await Department.findOne({
      code: req.departmentCode
    })
    if (department) {
      var offlineMessage = new OfflineMessage(req)
      offlineMessage.department = department._id
      offlineMessage.departmentEmail = department.offlineFormEmail
      await offlineMessage.save()

      let transporter = nodeMailer.createTransport(smtpConfig)
      // verify connection configuration
      transporter.verify(function(error, success) {
        if (error) {
          console.log('verify', error)
        }
      })
      var body = ''
      var filename = appRoot + '/templates/offline.ejs'
      ejs.renderFile(filename, req, function(err, str) {
        // str => Rendered HTML string
        body = str
      })

      let mailOptions = {
        from: process.env.SMTP_USER, // sender address
        to: department.offlineFormEmail, // list of receivers
        subject: 'General Enquiry', // Subject line
        text: req.message, // plain text body
        html: body // html body
      }
      transporter.sendMail(mailOptions)
    }
  } catch (error) {
    // do nothing
  }
}

async function createAccountEmail(req) {
  try {
    let transporter = nodeMailer.createTransport(smtpConfig)
    var body = ''
    var filename = appRoot + '/templates/createAccount.ejs'
    ejs.renderFile(filename, req, function(err, str) {
      // str => Rendered HTML string
      body = str
    })

    let mailOptions = {
      from: process.env.SMTP_USER, // sender address
      to: req.email, // list of receivers
      subject: 'Account Created', // Subject line
      text: 'Account Created', // plain text body
      html: body // html body
    }
    transporter.sendMail(mailOptions)
  } catch (error) {
    // do nothing
  }
}

async function resetPassword(req) {
  try {
    let transporter = nodeMailer.createTransport(smtpConfig)
    var body = ''
    var filename = appRoot + '/templates/resetPassword.ejs'
    ejs.renderFile(filename, req, function(err, str) {
      // str => Rendered HTML string
      body = str
    })

    let mailOptions = {
      from: process.env.SMTP_USER, // sender address
      to: req.email, // list of receivers
      subject: 'Password Reset', // Subject line
      text: 'Password Reset', // plain text body
      html: body // html body
    }
    transporter.sendMail(mailOptions)
  } catch (error) {
    // do nothing
  }
}

async function resetPasswordSuccess(req) {
  try {
    let transporter = nodeMailer.createTransport(smtpConfig)
    var body = ''
    var filename = appRoot + '/templates/resetPasswordSuccess.ejs'
    ejs.renderFile(filename, req, function(err, str) {
      // str => Rendered HTML string
      body = str
    })

    let mailOptions = {
      from: process.env.SMTP_USER, // sender address
      to: req.email, // list of receivers
      subject: 'Password Change Successful', // Subject line
      text: 'Password Change Successful', // plain text body
      html: body // html body
    }
    transporter.sendMail(mailOptions)
  } catch (error) {
    // do nothing
  }
}
