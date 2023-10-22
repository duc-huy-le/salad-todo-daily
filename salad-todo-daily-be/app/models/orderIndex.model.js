const db = require("../common/connect");

const BaseModel = require("./base.model");

const tableName = "order_index";

class OrderIndex extends BaseModel {
  constructor(orderIndex) {
    this.id = orderIndex.id;
    this.type = orderIndex.type;
    this.orderList = orderIndex.orderList;
    this.createdBy = orderIndex.createdBy;
  }

  static getAll(userId, additionalQuery) {
    return new Promise((resolve, reject) => {
      const querySQL = `SELECT * FROM ${this.tableName} WHERE createdBy = ${userId}`;
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

  static getByType(userId, orderIndexType) {
    const querySQL = `SELECT * FROM ${tableName} WHERE createdBy = ${userId} AND type = "${orderIndexType}"`;
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

  static updateLittleByType(userId, orderIndexType, payload) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE ${this.tableName} SET ? WHERE type = "${orderIndexType}" AND createdBy = ${userId}`,
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
}
OrderIndex.setTableName(tableName);

module.exports = OrderIndex;
