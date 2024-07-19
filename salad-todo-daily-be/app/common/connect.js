var mysql = require("mysql");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const environment = process.env.NODE_ENV ?? "development";
// if (environment === "production") {
//   const envConfig = dotenv.parse(fs.readFileSync(".env.prod"));
//   for (const key in envConfig) {
//     process.env[key] = envConfig[key];
//   }
// }

console.log(`In ${environment} environment`);

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect(function (err, connection) {
  if (err) console.log("Kết nối cơ sở dữ liệu không thành công. " + `Chi tiết: ${err}`);
  else console.log("Connected to database!");
});

module.exports = connection;
