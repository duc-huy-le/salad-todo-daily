var User = require("../models/user.model");
var JWT = require("../common/_JWT");

exports.getList = function (req, res) {
  User.getAll(function (data) {
    res.send({ result: data });
  });
};

exports.detail = function (req, res) {
  User.getById(req.params.id, function (response) {
    res.send({ result: response });
  });
};

exports.addUser = function (req, res) {
  var data = req.body;
  User.create(data, function (response) {
    res.send({ result: response });
  });
};

exports.removeUser = function (req, res) {
  var id = req.params.id;
  User.remove(id, function (response) {
    res.send({ result: response });
  });
};

exports.updateUser = function (req, res) {
  var data = req.body;
  User.update(data, function (response) {
    res.send({ result: response });
  });
};

exports.login = function (req, res) {
  var data = req.body;
  User.checkLogin(data, async function (response) {
    if (response) {
      const _token = await JWT.make(response);
      res.send({ data: response, token: _token, status: true });
    } else {
      res.send({ data: response, status: false });
    }
  });
};

exports.sessionInfo = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  const response = {
    id: tokenInfo.data.id,
    name: tokenInfo.data.name,
    email: tokenInfo.data.email,
  }
  res.send({status: true, data: response});
}
