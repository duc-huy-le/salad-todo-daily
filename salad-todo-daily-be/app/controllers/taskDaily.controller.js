var TaskDaily = require("../models/taskDaily.model");
var JWT = require("../common/_JWT");

exports.getList = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  TaskDaily.getAll(tokenInfo.data.id, function (data) {
    res.send({ result: data });
  });
};

exports.getById = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  TaskDaily.getById(tokenInfo.data.id, req.params.id, function (data) {
    res.send({ result: data });
  });
};

exports.add = async function (req, res) {
  var data = req.body;
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  data.createdBy = tokenInfo.data.id;
  TaskDaily.create(data, function (response) {
    res.send({ result: response });
  });
};

exports.update = function (req, res) {
  var data = req.body;
  data.checkList = JSON.stringify(data.checkList);
  TaskDaily.update(data, function (response) {
    res.send({ result: response });
  });
};

exports.updateLittle = function (req, res) {
  var data = req.body;
  if (data && data.checkList) {
    data.checkList = JSON.stringify(data.checkList);
  }
  TaskDaily.updateLittle(req.params.id, data, function (response) {
    res.send({ result: response });
  });
};

exports.remove = function (req, res) {
  var id = req.params.id;
  TaskDaily.remove(id, function (response) {
    res.send({ result: response });
  });
};
