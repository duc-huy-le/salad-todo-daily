var OrderIndex = require("../models/orderIndex.model");
var JWT = require("../common/_JWT");
const {
  getFormattedMySqlDateTime,
  handleRequest,
} = require("../helpers/helper");

exports.getList = async function (req, res) {
  handleRequest(req, res, async (userId) => {
    const orderIndexes = await OrderIndex.getAll(userId);
    res.send({ result: orderIndexes });
  });
};

// exports.update = function (req, res) {
//   var data = req.body;
//   if (data.checkList) data.checkList = JSON.stringify(data.checkList);
//   if (data.startDate)
//     data.startDate = getFormattedMySqlDateTime(data.startDate);
//   if (data.finishDate)
//     data.finishDate = getFormattedMySqlDateTime(data.finishDate);
//   Task.update(req.params.id, data, function (response) {
//     if (response) response[0].checkList = JSON.parse(response[0].checkList);
//     res.send({ result: response });
//   });
// };

exports.updateLittle = function (req, res) {
  handleRequest(req, res, async (userId) => {
    var data = req.body;
    if (data && data.orderList) {
      data.orderList = JSON.stringify(data.orderList);
    }
    const updateResult = await OrderIndex.updateLittle(req.params.id, data);
    if (updateResult)
      updateResult[0].orderList = JSON.parse(updateResult[0].orderList);
    res.send({ result: updateResult });
  });
};

exports.updateLittleByType = async function (req, res) {
  handleRequest(req, res, async (userId) => {
    var data = req.body;
    if (data && data.orderList) {
      data.orderList = JSON.stringify(data.orderList);
    }
    const updateResult = await OrderIndex.updateLittleByType(
      userId,
      req.params.type,
      data
    );
    if (updateResult)
      updateResult[0].orderList = JSON.parse(updateResult[0].orderList);
    res.send({ result: updateResult });
  });
};
