var Project = require("../models/project.model");
var JWT = require("../common/_JWT");
const { getFormattedMySqlDateTime } = require("../helpers/helper");

const handleRequest = async (req, res, callback) => {
  try {
    const token = req.headers.authorization;
    const tokenInfo = await JWT.check(token);
    await callback(tokenInfo.data.id, req, res);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
// exports.getList = async function (req, res) {
//   try {
//     const token = req.headers.authorization;
//     const tokenInfo = await JWT.check(token);
//     const projects = await Project.getAll(tokenInfo.data.id);
//     res.send({ result: projects });
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// };
exports.getList = async function (req, res) {
  handleRequest(req, res, async (userId) => {
    const projects = await Project.getAll(userId);
    res.send({ result: projects });
  });
};

exports.getById = async function (req, res) {
  handleRequest(req, res, async (userId) => {
    const project = await Project.getById(userId, req.params.id);
    res.send({ result: project });
  });
};

exports.add = async function (req, res) {
  handleRequest(req, res, async (userId) => {
    const data = req.body;
    data.createdBy = userId;
    if (data.startDate)
      data.startDate = getFormattedMySqlDateTime(data.startDate);
    if (data.finishDate)
      data.finishDate = getFormattedMySqlDateTime(data.finishDate);
    const project = await Project.create(data);
    res.send({ result: project });
  });
};

exports.update = async function (req, res) {
  handleRequest(req, res, async (userId) => {
    const data = req.body;
    if (data.startDate)
      data.startDate = getFormattedMySqlDateTime(data.startDate);
    if (data.finishDate)
      data.finishDate = getFormattedMySqlDateTime(data.finishDate);
    const updateResult = await Project.update(req.params.id, data);
    if (updateResult.affectedRows > 0) {
      const project = await Project.getById(userId, req.params.id);
      res.send({ result: project });
    }
  });
};

exports.updateLittle = async function (req, res) {
  handleRequest(req, res, async (userId) => {
    const data = req.body;
    if (data.startDate)
      data.startDate = getFormattedMySqlDateTime(data.startDate);
    if (data.finishDate)
      data.finishDate = getFormattedMySqlDateTime(data.finishDate);
    const updateResult = await Project.update(req.params.id, data);
    if (updateResult.affectedRows > 0) {
      const project = await Project.getById(userId, req.params.id);
      res.send({ result: project });
    }
  });
};
exports.remove = async function (req, res) {
  handleRequest(req, res, async (userId) => {
    const project = await Project.getById(userId, req.params.id);
    const removeResult = await Project.remove(req.params.id);
    if (removeResult.affectedRows > 0) {
      res.send({ result: project });
    }
  });
};
