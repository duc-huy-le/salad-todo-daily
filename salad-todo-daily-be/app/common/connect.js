var mysql = require("mysql");
require("dotenv").config();

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect(function (err, connection) {
  if (err) console.log("Kết nối cơ sở dữ liệu không thành công");
  else console.log("Connected to database!");
});

module.exports = connection;
