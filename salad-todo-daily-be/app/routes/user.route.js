module.exports = function (router) {
    var userController = require("../controllers/user.controller");
  
    router.get("/user/info", userController.sessionInfo);
  };
  