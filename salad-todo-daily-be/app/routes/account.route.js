module.exports = function (router) {
    var userController = require("../controllers/user.controller");
  
    router.post("/account/login", userController.login);
  };
  