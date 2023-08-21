module.exports = function (router) {
    var taskDailyHistoryController = require("../controllers/taskDailyHistory.controller");
  
    router.get("/task-daily-history", taskDailyHistoryController.getList);

    router.get("/task-daily-statistic/heatmap-data", taskDailyHistoryController.getListHeatmapData);

    // router.get("/task-daily-history/today", taskDailyHistoryController.getListToday);
  
    // router.get("/task-daily-history/:id", taskDailyHistoryController.getById);
  
    router.post("/task-daily-history", taskDailyHistoryController.add);
  
    // router.put("/task-daily-history", taskDailyHistoryController.update);

    // router.patch("/task-daily-history/:id", taskDailyHistoryController.updateLittle);
  
    router.delete("/task-daily-history/:id", taskDailyHistoryController.remove);
  };
  