const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agent.controller");

const SchemaValidator = require("../middlewares/validation");

// We are using the formatted Joi Validation error
// Pass false as argument to use a generic error
const validateRequest = SchemaValidator(true);

module.exports = function(app) {
  app.post(
    "/api/agents/findbyemail",
    validateRequest,
    agentController.getAgentByEmail
  );
  app.post(
    "/api/agents/findbyid",
    validateRequest,
    agentController.getAgentById
  );
  app.post(
    "/api/agents/datatable",
    validateRequest,
    agentController.getAgentDataTable
  );
};
