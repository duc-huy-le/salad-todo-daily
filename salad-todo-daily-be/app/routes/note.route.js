module.exports = function (router) {
    var noteController = require("../controllers/note.controller");
  
    router.get("/note", noteController.getList);
  
    router.get("/note/:id", noteController.getById);
  
    router.post("/note", noteController.add);
  
    router.put("/note", noteController.update);

    router.patch("/note/:id", noteController.updateLittle);
  
    router.delete("/note/:id", noteController.remove);
  };
  