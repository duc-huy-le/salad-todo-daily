var taskController = require("../controllers/task.controller");
const routes = [
  {
    method: "get",
    path: "/task",
    handler: taskController.getList,
  },
  {
    method: "get",
    path: "/task/uncompleted",
    handler: taskController.getListUncompleted,
  },
  {
    method: "get",
    path: "/task/:id",
    handler: taskController.getById,
  },
  { method: "post", path: "/task", handler: taskController.add },
  { method: "put", path: "/task/:id", handler: taskController.update },
  { method: "patch", path: "/task/:id", handler: taskController.updateLittle },
  {
    method: "patch",
    path: "/task/update/many",
    handler: taskController.updateLittleMany,
  },
  { method: "delete", path: "/task/:id", handler: taskController.remove },
];

module.exports = function (router) {
  for (const route of routes) {
    router[route.method](route.path, route.handler);
  }
};
