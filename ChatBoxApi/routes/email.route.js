const express = require("express");
const router = express.Router();
const emailController = require("../controllers/email.controller");

const SchemaValidator = require("../middlewares/validation");

// We are using the formatted Joi Validation error
// Pass false as argument to use a generic error
const validateRequest = SchemaValidator(true);

module.exports = function(app) {
  app.post(
    "/api/email/offline",
    validateRequest,
    emailController.offlineMessageSchema
  );
};
