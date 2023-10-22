const db = require("../common/connect");

const tableName = "project";

class Project {
  constructor(project) {
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

  static getAll(userId) {
    return new Promise((resolve, reject) => {
      const querySQL = `SELECT * FROM ${tableName} WHERE createdBy = ${userId} AND isDeleted = 0`;
      db.query(querySQL, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  static getById(userId, projectId) {
    return new Promise((resolve, reject) => {
      const querySQL = `SELECT * FROM ${tableName} WHERE createdBy = ${userId} AND id = ${projectId}`;
      db.query(querySQL, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  static create(payload) {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO ${tableName} SET ?`, payload, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: data.insertId, ...payload });
        }
      });
    });
  }

  static update(recordId, payload) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE ${tableName} SET ? WHERE id = ${recordId}`,
        payload,
        function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  static updateLittle(recordId, payload) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE ${tableName} SET ? WHERE id = ${recordId}`,
        payload,
        function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }
  static remove(recordId) {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM ${tableName} WHERE id = ${recordId}`,
        function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }
}

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
