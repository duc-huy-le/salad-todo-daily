var Task = require("../models/task.model");
var JWT = require("../common/_JWT");
const {
  getFormattedMySqlDateTime,
  formatTimeValue,
} = require("../helpers/helper");
const OrderIndex = require("../models/orderIndex.model");

exports.getList = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  Task.getAll(tokenInfo.data.id, req.query, function (data) {
    if (data) {
      data.forEach((element) => {
        element.checkList = JSON.parse(element.checkList);
      });
      OrderIndex.getAll(tokenInfo.data.id, function (orderData) {
        if (orderData) {
          openTaskOrder = JSON.parse(
            orderData.find((x) => x.type === "open-task").orderList
          );
          inProgressTaskOrder = JSON.parse(
            orderData.find((x) => x.type === "in-progress-task").orderList
          );
          doneTaskOrder = JSON.parse(
            orderData.find((x) => x.type === "done-task").orderList
          );
          allTaskOrder = [
            ...openTaskOrder,
            ...inProgressTaskOrder,
            ...doneTaskOrder,
          ];
          data = data.sort((a, b) => {
            const indexA = allTaskOrder.indexOf(a.id);
            const indexB = allTaskOrder.indexOf(b.id);
            return indexA - indexB;
          });
        }
        res.send({ result: data });
      });
    }
  });
};

exports.getListUncompleted = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  Task.getAllUncompleted(tokenInfo.data.id, req.query, function (data) {
    if (data) {
      data.forEach((element) => {
        element.checkList = JSON.parse(element.checkList);
      });
    }
    res.send({ result: data });
  });
};

exports.getById = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  Task.getById(tokenInfo.data.id, req.params.id, function (data) {
    if (data) {
      data.forEach((element) => {
        element.checkList = JSON.parse(element.checkList);
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
  data.checkList = JSON.stringify(data.checkList);
  if (data.startDate)
    data.startDate = getFormattedMySqlDateTime(data.startDate);

  if (data.finishDate)
    data.finishDate = getFormattedMySqlDateTime(data.finishDate);
  Task.create(data, function (response) {
    if (response.checkList) response.checkList = JSON.parse(response.checkList);
    res.send({ result: response });
  });
};

exports.update = function (req, res) {
  var data = req.body;
  if (data.checkList) data.checkList = JSON.stringify(data.checkList);
  if (data.startDate)
    data.startDate = getFormattedMySqlDateTime(data.startDate);
  if (data.finishDate)
    data.finishDate = getFormattedMySqlDateTime(data.finishDate);
  Task.update(req.params.id, data, function (response) {
    if (response) response[0].checkList = JSON.parse(response[0].checkList);
    res.send({ result: response });
  });
};

exports.updateLittle = function (req, res) {
  var data = req.body;
  if (data && data.checkList) {
    data.checkList = JSON.stringify(data.checkList);
  }
  formatTimeValue(data, "startDate", "finishDate");
  Task.updateLittle(req.params.id, data, function (response) {
    if (response) response[0].checkList = JSON.parse(response[0].checkList);
    res.send({ result: response });
  });
};

exports.updateLittleMany = function (req, res) {
  var data = req.body;
  if (data && data.checkList) {
    data.checkList = JSON.stringify(data.checkList);
  }
  formatTimeValue(data, "startDate", "finishDate");
  const listIds = data.listIds;
  delete data.listIds;
  Task.updateLittleMany(listIds, data, function (response) {
    // if (response) response[0].checkList = JSON.parse(response[0].checkList);
    res.send({ result: response });
  });
};

exports.remove = function (req, res) {
  var id = req.params.id;
  Task.remove(id, function (response) {
    res.send({ result: response });
  });
};
