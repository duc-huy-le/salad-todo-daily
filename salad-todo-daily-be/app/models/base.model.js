const db = require("../common/connect");

class BaseModel {
  constructor(tableName) {
    // this.tableName = tableName;
  }
  static setTableName(tableName) {
    this.tableName = tableName;
  }

  static getAll(userId, additionalQuery) {
    return new Promise((resolve, reject) => {
      const querySQL = `SELECT * FROM ${this.tableName} WHERE createdBy = ${userId} AND isDeleted = 0`;
      if (additionalQuery) {
        querySQL += ` AND ${additionalQuery}`;
      }
      db.query(querySQL, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  static getById(userId, recordId) {
    return new Promise((resolve, reject) => {
      const querySQL = `SELECT * FROM ${this.tableName} WHERE createdBy = ${userId} AND id = ${recordId}`;
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
      db.query(
        `INSERT INTO ${this.tableName} SET ?`,
        payload,
        function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: data.insertId, ...payload });
          }
        }
      );
    });
  }

  static update(recordId, payload) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE ${this.tableName} SET ? WHERE id = ${recordId}`,
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
        `DELETE FROM ${this.tableName} WHERE id = ${recordId}`,
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

module.exports = BaseModel;
