module.exports = function (router) {
    var taskDailyController = require("../controllers/taskDaily.controller");
  
    router.get("/task-daily", taskDailyController.getList);

    router.get("/task-daily/today", taskDailyController.getListToday);
  
    router.get("/task-daily/:id", taskDailyController.getById);
  
    router.post("/task-daily", taskDailyController.add);
  
    router.put("/task-daily", taskDailyController.update);

    router.patch("/task-daily/:id", taskDailyController.updateLittle);
  
    router.delete("/task-daily/:id", taskDailyController.remove);
  };
  