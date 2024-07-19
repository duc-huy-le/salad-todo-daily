module.exports = function (router) {
  console.log("Router: /account");
  var userController = require("../controllers/user.controller");

  router.post("/account/login", userController.login);
};
