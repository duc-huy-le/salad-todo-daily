var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234567",
  database: "salad_todo_daily",
});

connection.connect(function (err, connection) {
  if (err) console.log("Kết nối cơ sở dữ liệu không thành công");
  else console.log("Connected to database!");
});

module.exports = connection;
