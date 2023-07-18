var express = require("express");
const cors = require('cors');
var app = express();
app.use(cors());
const _AuthMiddleWare = require("./app/common/_AuthMiddleWare");

// Cấu hình body-parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// // Allow Origin
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

//   Các router
require("./app/routes/account.route")(app);
app.use(_AuthMiddleWare.isAuth);
require("./app/routes/user.route")(app);
require("./app/routes/project.route")(app);
require("./app/routes/task.route")(app);
require("./app/routes/tag.route")(app);
require("./app/routes/taskDaily.route")(app);
require("./app/routes/note.route")(app);


app.listen(3000, function () {
  console.log("Listening on port http://localhost:3000");
});
