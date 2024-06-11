const emailService = require('../services/email.service')

module.exports = {
  offlineMessageSchema
}

function offlineMessageSchema(req, res, next) {
  emailService
    .offlineMessageSchema(req.body)
    .then(user => res.json(user))
    .catch(err => next(err))
}
