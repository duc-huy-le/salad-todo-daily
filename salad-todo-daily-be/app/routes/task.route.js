module.exports = function (router) {
    var taskController = require("../controllers/task.controller");
  
    router.get("/task", taskController.getList);
  
    router.get("/task/:id", taskController.getById);
  
    router.post("/task", taskController.add);
  
    router.put("/task/:id", taskController.update);

    router.patch("/task/:id", taskController.updateLittle);
  
    router.delete("/task/:id", taskController.remove);
  };
  