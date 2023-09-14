module.exports = function (router) {
    var orderIndexController = require("../controllers/orderIndex.controller");
  
    router.get("/order-index", orderIndexController.getList);
  
    // router.get("/order-index/:id", taskController.getById);
  
    // router.post("/order-index", taskController.add);
  
    // router.put("/order-index/:id", taskController.update);

    router.patch("/order-index/:id", orderIndexController.updateLittle);

    router.patch("/order-index/by-type/:type", orderIndexController.updateLittleByType);
  
    // router.delete("/order-index/:id", taskController.remove);
  };
  