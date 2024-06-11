const agentService = require("../services/agent.service");
const mapper = require("../helpers/mapper");

module.exports = {
  getAgentByEmail,
  getAgentById,
  getAgentDataTable
};

function getAgentByEmail(req, res, next) {
  agentService
    .getAgentByEmail(req.body)
    .then(agent => res.json(agent))
    .catch(err => next(err));
}

function getAgentById(req, res, next) {
  agentService
    .getAgentById(req.body)
    .then(agent => res.json(agent))
    .catch(err => next(err));
}

function getAgentDataTable(req, res, next) {
  agentService
    .getAgentDataTable(mapper.kendoMapper(req.body))
    .then(users => {
      res.json(users);
    })
    .catch(err => next(err));
}
