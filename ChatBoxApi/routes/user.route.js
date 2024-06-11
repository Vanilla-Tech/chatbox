const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

const SchemaValidator = require('../middlewares/validation')

// We are using the formatted Joi Validation error
// Pass false as argument to use a generic error
const validateRequest = SchemaValidator(true)

module.exports = function(app) {
  app.post('/api/login', validateRequest, userController.authenticate)
  app.get('/api/users/:id', validateRequest, userController.getById)
  app.get('/api/checkauth', validateRequest, userController.checkAuth)
  app.post('/api/resetpassword', validateRequest, userController.resetPassword)
  app.post(
    '/api/changepassword',
    validateRequest,
    userController.changePassword
  )
  app.post(
    '/api/forcechangepassword',
    validateRequest,
    userController.forceChangePassword
  )
  app.post('/api/users/block', validateRequest, userController.blockUser)
  app.post('/api/users/unblock', validateRequest, userController.unblockUser)
  app.post(
    '/api/users/approveuser',
    validateRequest,
    userController.approveUser
  )
  app.post('/api/users/createuser', validateRequest, userController.createUser)
  app.post('/api/users/updateuser', validateRequest, userController.updateUser)
  app.post(
    '/api/users/datatable',
    validateRequest,
    userController.getUserDataTable
  )

  app.get('/api/agent/list', validateRequest, userController.getAgentList)
}
