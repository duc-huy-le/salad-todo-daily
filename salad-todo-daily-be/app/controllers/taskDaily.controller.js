var TaskDailyHistory = require("../models/taskDailyHistory.model");
var TaskDaily = require("../models/taskDaily.model");
var JWT = require("../common/_JWT");
const { getFormattedMySqlDateTime } = require("../helpers/helper");

exports.getList = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  TaskDaily.getAll(tokenInfo.data.id, function (data) {
    if (data) {
      data.forEach((element) => {
        element.tagId = JSON.parse(element.tagId);
      });
    }
    res.send({ result: data });
  });
};

exports.getListToday = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  TaskDaily.getAllToday(tokenInfo.data.id, function (data) {
    if (data) {
      data.forEach((element) => {
        element.tagId = JSON.parse(element.tagId);
        if (element.checked === 1) element.checked = true;
        else element.checked = false;
      });
    }
    res.send({ result: data });
  });
};

exports.getById = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  TaskDaily.getById(tokenInfo.data.id, req.params.id, function (data) {
    if (data) {
      data.forEach((element) => {
        element.tagId = JSON.parse(element.tagId);
      });
    }
    res.send({ result: data });
  });
};

exports.add = async function (req, res) {
  var data = req.body;
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  data.createdBy = tokenInfo.data.id;
  data.tagId = JSON.stringify(data.tagId);
  if (data.startDate)
    data.startDate = getFormattedMySqlDateTime(data.startDate);
  TaskDaily.create(data, function (response) {
    res.send({ result: response });
  });
};

exports.update = function (req, res) {
  var data = req.body;
  data.tagId = JSON.stringify(data.tagId);
  if (data.startDate)
    data.startDate = getFormattedMySqlDateTime(data.startDate);
  TaskDaily.update(req.params.id, data, function (response) {
    if (response) response[0].tagId = JSON.parse(response[0].tagId);
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
