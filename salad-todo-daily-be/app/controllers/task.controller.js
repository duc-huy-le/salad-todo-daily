var Task = require("../models/task.model");
var JWT = require("../common/_JWT");
const Helper = require("../helpers/helper");
const OrderIndex = require("../models/orderIndex.model");
const jsonPropNameList = ["checkList"];

exports.getList = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  Task.getAll(tokenInfo.data.id, req.query, async function (data) {
    if (data) {
      Helper.parseJsonProperty(data, jsonPropNameList);
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
      Helper.parseJsonProperty(data, jsonPropNameList);
    }
    res.send({ result: data });
  });
};

exports.getById = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  Task.getById(tokenInfo.data.id, req.params.id, function (data) {
    if (data) {
      Helper.parseJsonProperty(data, jsonPropNameList);
    }
    res.send({ result: data });
  });
};

exports.add = async function (req, res) {
  var data = req.body;
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  data.createdBy = tokenInfo.data.id;
  Helper.stringifyJsonProperty(data, jsonPropNameList);
  if (data.startDate)
    data.startDate = Helper.getFormattedMySqlDateTime(data.startDate);

  if (data.finishDate)
    data.finishDate = Helper.getFormattedMySqlDateTime(data.finishDate);
  Task.create(data, function (response) {
    if (response.checkList) response.checkList = JSON.parse(response.checkList);
    res.send({ result: response });
  });
};

exports.update = function (req, res) {
  var data = req.body;
  Helper.stringifyJsonProperty(data, jsonPropNameList);
  if (data.startDate)
    data.startDate = Helper.getFormattedMySqlDateTime(data.startDate);
  if (data.finishDate)
    data.finishDate = Helper.getFormattedMySqlDateTime(data.finishDate);
  taskBeforeUpdateInterceptor(data);
  Task.update(req.params.id, data, function (response) {
    if (response) Helper.parseJsonProperty(response, jsonPropNameList);
    res.send({ result: response });
  });
};

exports.updateLittle = function (req, res) {
  var data = req.body;
  if (data) {
    Helper.stringifyJsonProperty(data, jsonPropNameList);
  }
  Helper.formatTimeValue(data, "startDate", "finishDate");
  taskBeforeUpdateInterceptor(data);
  Task.updateLittle(req.params.id, data, function (response) {
    if (response) Helper.parseJsonProperty(response, jsonPropNameList);
    res.send({ result: response });
  });
};

exports.updateLittleMany = function (req, res) {
  var data = req.body;
  if (data) {
    Helper.stringifyJsonProperty(data, jsonPropNameList);
  }
  Helper.formatTimeValue(data, "startDate", "finishDate");
  const listIds = data.listIds;
  delete data.listIds;
  Task.updateLittleMany(listIds, data, function (response) {
    res.send({ result: response });
  });
};

exports.remove = function (req, res) {
  var id = req.params.id;
  Task.remove(id, function (response) {
    res.send({ result: response });
  });
};

function taskBeforeUpdateInterceptor(data) {
  if(data.status == 2) {
    let endOfToday = new Date();
    endOfToday.setHours(23, 59, 59);
    data.finishDate = Helper.getFormattedMySqlDateTime(endOfToday);
  }
}

function taskAfterUpdateInterceptor(oldData, newData, userId) {
  if(oldData.projectId != newData.projectId) {
    let oldProjectTaskCount = Task.getTaskCountByProjectId(userId, oldData.projectId);
  }
}
