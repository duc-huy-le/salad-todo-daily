module.exports = function (router) {
  var projectController = require("../controllers/project.controller");

  router.get("/project", projectController.getList);

  router.get("/project/:id", projectController.getById);

  router.post("/project", projectController.add);

  router.put("/project", projectController.update);

  router.delete("/project/:id", projectController.remove);
};

// const express = require('express');
// const router = express.Router();
// const projectController = require("../controllers/project.controller");

// router.get("/", projectController.getList);

// module.exports = router;
