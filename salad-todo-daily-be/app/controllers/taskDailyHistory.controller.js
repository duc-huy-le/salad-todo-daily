var TaskDailyHistory = require("../models/taskDailyHistory.model");
var JWT = require("../common/_JWT");
const { getFormattedMySqlDateTime } = require("../helpers/helper");

// exports.getList = async function (req, res) {
//   const token = req.headers.authorization;
//   const tokenInfo = await JWT.check(token);
//   TaskDailyHistory.getAll(tokenInfo.data.id, function (data) {
//     res.send({ result: data });
//   });
// };

// exports.getListToday = async function (req, res) {
//   const token = req.headers.authorization;
//   const tokenInfo = await JWT.check(token);
//   TaskDailyHistory.getAllToday(tokenInfo.data.id, function (data) {
//     if(data) {
//       data.forEach((element) => {
//         if(element.checked === 1) element.checked = true;
//         else element.checked = false;
//       })
//     }
//     res.send({ result: data });
//   });
// };

// exports.getById = async function (req, res) {
//   const token = req.headers.authorization;
//   const tokenInfo = await JWT.check(token);
//   TaskDailyHistory.getById(tokenInfo.data.id, req.params.id, function (data) {
//     res.send({ result: data });
//   });
// };

exports.add = async function (req, res) {
  var data = req.body;
  data.completionDate = getFormattedMySqlDateTime(data.completionDate);
  TaskDailyHistory.create(data, function (response) {
    res.send({ result: response });
  });
};

// exports.update = function (req, res) {
//   var data = req.body;
//   data.checkList = JSON.stringify(data.checkList);
//   TaskDailyHistory.update(data, function (response) {
//     res.send({ result: response });
//   });
// };

// exports.updateLittle = function (req, res) {
//   var data = req.body;
//   if (data && data.checkList) {
//     data.checkList = JSON.stringify(data.checkList);
//   }
//   TaskDailyHistory.updateLittle(req.params.id, data, function (response) {
//     res.send({ result: response });
//   });
// };

exports.remove = function (req, res) {
  var id = req.params.id;
  TaskDailyHistory.remove(id, function (response) {
    res.send({ result: response });
  });
};
