const projectController = require("../controllers/project.controller");

const routes = [
  { method: "get", path: "/project", handler: projectController.getList },
  { method: "get", path: "/project/:id", handler: projectController.getById },
  { method: "post", path: "/project", handler: projectController.add },
  { method: "put", path: "/project/:id", handler: projectController.update },
  { method: "patch", path: "/project/:id", handler: projectController.updateLittle },
  { method: "delete", path: "/project/:id", handler: projectController.remove }
];

module.exports = function(router) {
  for (const route of routes) {
    router[route.method](route.path, route.handler);
  }
};