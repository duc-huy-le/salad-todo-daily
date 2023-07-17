var Task = require("../models/task.model");
var JWT = require("../common/_JWT");

exports.getList = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  Task.getAll(tokenInfo.data.id, function (data) {
    data.forEach((element) => {
      element.checkList = JSON.parse(element.checkList);
    });
    res.send({ result: data });
  });
};

exports.getById = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  Task.getById(tokenInfo.data.id, req.params.id, function (data) {
    data.forEach((element) => {
      element.checkList = JSON.parse(element.checkList);
    });
    res.send({ result: data });
  });
};

exports.add = async function (req, res) {
  var data = req.body;
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  data.createdBy = tokenInfo.data.id;
  data.checkList = JSON.stringify(data.checkList);
  Task.create(data, function (response) {
    response.checkList = JSON.parse(response.checkList);
    res.send({ result: response });
  });
};

exports.update = function (req, res) {
  var data = req.body;
  data.checkList = JSON.stringify(data.checkList);
  Task.update(data, function (response) {
    res.send({ result: response });
  });
};

exports.updateLittle = function (req, res) {
  var data = req.body;
  if(data && data.checkList) {
    data.checkList = JSON.stringify(data.checkList);
  }
  Task.updateLittle(req.params.id, data, function (response) {
    res.send({ result: response });
  });
};

exports.remove = function (req, res) {
  var id = req.params.id;
  Task.remove(id, function (response) {
    res.send({ result: response });
  });
};
