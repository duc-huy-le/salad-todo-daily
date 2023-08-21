var TaskDailyHistory = require("../models/taskDailyHistory.model");
var JWT = require("../common/_JWT");
const { getFormattedMySqlDateTime } = require("../helpers/helper");

exports.getList = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  TaskDailyHistory.getAll(tokenInfo.data.id, function (data) {
    res.send({ result: data });
  });
};

exports.getListHeatmapData = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  TaskDailyHistory.getAll(tokenInfo.data.id, function (data) {
    let finalResult = [];
    if (data) {
      const today = new Date();
      const dateInLastYear = new Date(
        today.getFullYear() - 1,
        today.getMonth(),
        today.getDate()
      );
      const listId = [...new Set(data.map((obj) => obj.taskDailyId))].sort(
        (a, b) => a - b
      );
      for (let i = 0; i < listId.length; i++) {
        let startDate = dateInLastYear;
        // Lấy ra ngày đầu tuần lúc đó
        const dayOfWeek = startDate.getDay();
        const diff =
          startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        startDate = new Date(startDate.setDate(diff));
        // startDate = startDate.setHours(0, 0, 0, 0);
        let listTaskLog = data.filter((item) => item.taskDailyId === listId[i]);
        let yearData = [];
        for (let w = 0; w < 54; w++) {
          let weekData = [];
          for (let d = 0; d < 7; d++) {
            let isWorked = listTaskLog.find((item) => {
              var itemCompletionDate = new Date(item.completionDate);
              return (
                itemCompletionDate.getFullYear() === startDate.getFullYear() &&
                itemCompletionDate.getMonth() === startDate.getMonth() &&
                itemCompletionDate.getDate() === startDate.getDate()
              );
            });
            if (isWorked) weekData.push(1);
            else if (startDate > today) weekData.push(null);
            else weekData.push(0);
            startDate.setDate(startDate.getDate() + 1);
          }
          yearData.push(weekData);
        }
        finalResult.push({
          dailyTaskId: listId[i],
          startFrom: dateInLastYear,
          data: [...yearData],
        });
      }
    }

    res.send({ result: finalResult });
    // res.send({ result: data });
  });
};

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
