const BaseModel = require("./base.model");

const tableName = "project";

class Project extends BaseModel {
  constructor(project) {
    // super(Project.tableName);
    this.id = project.id;
    this.name = project.name;
    this.description = project.description;
    this.color = project.color;
    this.totalTask = project.totalTask;
    this.completedTask = project.completedTask;
    this.isDeleted = project.isDeleted;
    this.startDate = project.startDate;
    this.createdAt = project.createdAt;
  }
}
Project.setTableName(tableName);

module.exports = Project;

// Project.updateLittle = function (recordId, payload, result) {
//   let query = `update ${tableName} set`;
//   const fields = Object.keys(payload);
//   const fieldValues = [];
//   for (let i = 0; i < fields.length; i++) {
//     if (fields[i] !== "id") {
//       query += ` ${fields[i]} = ?,`;
//       fieldValues.push(payload[fields[i]]);
//     }
//   }
//   query = query.slice(0, -1);
//   query += ` where id = ${recordId}`;
//   db.query(query, fieldValues, function (err, data) {
//     if (err) {
//       result(err);
//     } else {
//       db.query(
//         `select * from ${tableName} where id = ${recordId}`,
//         function (err, updatedData) {
//           if (err) {
//             result(err);
//           } else {
//             result(updatedData);
//           }
//         }
//       );
//     }
//   });
// };
