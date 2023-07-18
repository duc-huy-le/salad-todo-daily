var Tag = require("../models/tag.model");
var JWT = require("../common/_JWT");

exports.getList = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  Tag.getAll(tokenInfo.data.id, function (data) {
    res.send({ result: data });
  });
};

exports.getById = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  Tag.getById(tokenInfo.data.id, req.params.id, function (data) {
    res.send({ result: data });
  });
};

exports.add = async function (req, res) {
  var data = req.body;
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  data.createdBy = tokenInfo.data.id;
  Tag.create(data, function (response) {
    res.send({ result: response });
  });
};

exports.update = function (req, res) {
  var data = req.body;
  data.checkList = JSON.stringify(data.checkList);
  Tag.update(data, function (response) {
    res.send({ result: response });
  });
};

exports.updateLittle = function (req, res) {
  var data = req.body;
  if (data && data.checkList) {
    data.checkList = JSON.stringify(data.checkList);
  }
  Tag.updateLittle(req.params.id, data, function (response) {
    res.send({ result: response });
  });
};

exports.remove = function (req, res) {
  var id = req.params.id;
  Tag.remove(id, function (response) {
    res.send({ result: response });
  });
};
