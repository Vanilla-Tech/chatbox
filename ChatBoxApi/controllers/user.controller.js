const userService = require('../services/user.service')

module.exports = {
  authenticate,
  getById,
  resetPassword,
  forceChangePassword,
  changePassword,
  approveUser,
  blockUser,
  unblockUser,
  createUser,
  updateUser,
  getUserDataTable,
  getAgentList,
  checkAuth
}

function checkAuth(req, res, next) {
  res.json('')
}

function authenticate(req, res, next) {
  userService
    .authenticate(req)
    .then(user => res.json(user))
    .catch(err => next(err))
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then(user => res.json(user))
    .catch(err => next(err))
}
function getAgentList(req, res, next) {
  userService
    .getUserListByType('AGENT')
    .then(user => res.json(user))
    .catch(err => next(err))
}

function resetPassword(req, res, next) {
  userService
    .resetPassword(req)
    .then(() => res.json())
    .catch(err => next(err))
}

function changePassword(req, res, next) {
  userService
    .changePassword(req)
    .then(() => res.json())
    .catch(err => next(err))
}
function forceChangePassword(req, res, next) {
  userService
    .forceChangePassword(req)
    .then(user => res.json(user))
    .catch(err => next(err))
}
function approveUser(req, res, next) {
  userService
    .approveUser(req)
    .then(() => res.json())
    .catch(err => next(err))
}
function unblockUser(req, res, next) {
  userService
    .unblockUser(req)
    .then(() => res.json())
    .catch(err => next(err))
}
function blockUser(req, res, next) {
  userService
    .blockUser(req)
    .then(() => res.json())
    .catch(err => next(err))
}

function createUser(req, res, next) {
  userService
    .createUser(req)
    .then(() => res.json())
    .catch(err => next(err))
}

function updateUser(req, res, next) {
  userService
    .updateUser(req)
    .then(() => res.json())
    .catch(err => next(err))
}

function getUserDataTable(req, res, next) {
  userService
    .getUserDataTable(req)
    .then(users => {
      res.json(users)
    })
    .catch(err => next(err))
}
