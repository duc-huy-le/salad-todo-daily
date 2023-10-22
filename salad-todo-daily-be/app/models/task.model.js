const db = require("../common/connect");
const BaseModel = require("./base.model");
const tableName = "task";

class Task extends BaseModel {
  constructor(task) {
    this.id = task.id;
    this.name = task.name;
    this.projectId = task.projectId;
    this.description = task.description;
    this.startDate = task.startDate;
    this.finishDate = task.finishDate;
    this.priority = task.priority;
    this.status = task.status;
    this.duration = task.duration;
    this.checkList = task.checkList;
    this.isDeleted = task.isDeleted;
    this.createdAt = task.createdAt;
    this.createdBy = task.createdBy;
  }

  static getAll(userId, query) {
    let querySQL = `SELECT * FROM ${tableName} WHERE createdBy = ${userId} AND isDeleted = 0`;
    if (query.projectId) {
      const idList = query.projectId.split(",").map(Number);
      querySQL += ` and (projectId in (${idList})${
        idList.includes(0) ? " or projectId is null)" : ")"
      }`;
    }
    return new Promise((resolve, reject) => {
      db.query(querySQL, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  static getAllUncompleted(userId, query) {
    let querySQL = `SELECT * FROM ${tableName} WHERE createdBy = ${userId} AND status != 2 AND finishDate < CURDATE() AND isDeleted = 0`;
    return new Promise((resolve, reject) => {
      db.query(querySQL, function (err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static updateLittleMany(recordIds, payload) {
    let querySql = `UPDATE ${tableName} SET`;
    const fields = Object.keys(payload);
    const fieldValues = [];
    for (let i = 0; i < fields.length; i++) {
      if (fields[i] !== "id") {
        querySql += ` ${fields[i]} = ?,`;
        fieldValues.push(payload[fields[i]]);
      }
    }
    querySql = querySql.slice(0, -1);
    querySql += ` WHERE id IN (${recordIds.join(", ")})`;
    return new Promise((resolve, reject) => {
      db.query(querySql, fieldValues, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}
Task.setTableName(tableName);

module.exports = Task;
