module.exports = function (router) {
    var tagController = require("../controllers/tag.controller");
  
    router.get("/tag", tagController.getList);
  
    router.get("/tag/:id", tagController.getById);
  
    router.post("/tag", tagController.add);
  
    router.put("/tag/:id", tagController.update);

    router.patch("/tag/:id", tagController.updateLittle);
  
    router.delete("/tag/:id", tagController.remove);
  };
  