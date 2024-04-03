var orderIndexController = require("../controllers/orderIndex.controller");

const routes = [
  {
    method: "get",
    path: "/order-index",
    handler: orderIndexController.getList,
  },
  {
    method: "patch",
    path: "/order-index/by-type/:type",
    handler: orderIndexController.updateLittleByType,
  },
  {
    method: "patch",
    path: "/order-index/:id",
    handler: orderIndexController.updateLittle,
  },
]

module.exports = function(router) {
  for (const route of routes) {
    router[route.method](route.path, route.handler);
  }
};