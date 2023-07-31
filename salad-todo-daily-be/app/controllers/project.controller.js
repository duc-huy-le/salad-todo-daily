var Project = require("../models/project.model");
var JWT = require("../common/_JWT");
const {
  getFormattedMySqlDateTime,
} = require("../helpers/helper");

exports.getList = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  Project.getAll(tokenInfo.data.id, function (data) {
    res.send({ result: data });
  });
};

exports.getById = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  Project.getById(tokenInfo.data.id, req.params.id, function (response) {
    res.send({ result: response });
  });
};

exports.add = async function (req, res) {
  var data = req.body;
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  data.createdBy = tokenInfo.data.id;
  if (data.startDate)
    data.startDate = getFormattedMySqlDateTime(data.startDate);

  if (data.finishDate)
    data.finishDate = getFormattedMySqlDateTime(data.finishDate);  
  Project.create(data, function (response) {
    res.send({ result: response });
  });
};

exports.update = function (req, res) {
  var data = req.body;
  if (data.startDate)
    data.startDate = getFormattedMySqlDateTime(data.startDate);
  if (data.finishDate)
    data.finishDate = getFormattedMySqlDateTime(data.finishDate);
  Project.update(req.params.id, data, function (response) {
    res.send({ result: response });
  });
};

exports.updateLittle = function (req, res) {
  var data = req.body;
  Project.updateLittle(req.params.id, data, function (response) {
    res.send({ result: response });
  });
};

exports.remove = function (req, res) {
  var id = req.params.id;
  Project.remove(id, function (response) {
    res.send({ result: response });
  });
};
