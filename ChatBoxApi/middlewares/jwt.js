const expressJwt = require('express-jwt')
const userService = require('../services/user.service')
const keys = require('../helpers/secretKey')

module.exports = jwt
var authChecker = function(req) {
  if (req.originalUrl.includes('/api/login')) {
    return true
  }
  if (req.originalUrl.includes('/api/chat/downloadChatTranscript/')) {
    return true
  }
  if (req.header('ClientId') !== null && req.header('SecretKey')) {
    var clientKey = keys.filter(
      c =>
        c.key === req.header('ClientId') && c.secret === req.header('SecretKey')
    )
    if (clientKey.length > 0) {
      return true
    }
    return false
  }
}
function jwt() {
  const secret = process.env.JWT_KEY
  return expressJwt({
    secret: secret,
    isRevoked: isRevoked,
    requestProperty: 'auth'
  }).unless(authChecker)
}

async function isRevoked(req, payload, done) {
  const key = req.header('authorization').replace('Bearer ', '')
  const user = await userService.getById(payload.sub)
  // revoke token if user no longer exists
  if (!user) {
    return done(null, true)
  }
  if (user.currentJwtToken !== key) {
    return done(null, true)
  }
  if (user.status !== 'APPROVED') {
    return done(null, true)
  }
  if (user.isBlocked) {
    return done(null, true)
  }
  done()
}
