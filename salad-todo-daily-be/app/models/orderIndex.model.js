const db = require("../common/connect");
const OrderIndex = function (orderIndex) {
  this.id = orderIndex.id;
  this.type = orderIndex.type;
  this.orderList = orderIndex.orderList;
  this.createdBy = orderIndex.createdBy;
};

const tableName = "order_index";

OrderIndex.getAll = function (userId, query, result) {
  db.query(
    `SELECT * FROM ${tableName} WHERE createdBy = ${userId}`,
    function (err, data) {
      if (err) {
        result(err);
      } else {
        result(data);
      }
    }
  );
};

OrderIndex.create = function (payload, result) {
  db.query(`insert into ${tableName} set ?`, payload, function (err, data) {
    if (err) {
      result(err);
    } else {
      result({ id: data.insertId, ...payload });
    }
  });
};

OrderIndex.update = function (recordId, payload, result) {
  db.query(
    `update ${tableName} set name = ?, description = ?, tagId = ?, startDate = ?, finishDate = ?, priority = ?, isDeleted = ? where id = ${recordId}`,
    [
      payload.name,
      payload.description,
      payload.tagId,
      payload.startDate,
      payload.finishDate,
      payload.priority,
      payload.isDeleted,
    ],
    function (err, data) {
      if (err) {
        result(err);
      } else {
        db.query(
          `select * from ${tableName} where id = ${recordId}`,
          function (err, updatedData) {
            if (err) {
              result(err);
            } else {
              result(updatedData);
            }
          }
        );
      }
    }
  );
};

OrderIndex.updateLittle = function (recordId, payload, result) {
  let query = `update ${tableName} set`;
  const fields = Object.keys(payload);
  const fieldValues = [];
  for (let i = 0; i < fields.length; i++) {
    if (fields[i] !== "id") {
      query += ` ${fields[i]} = ?,`;
      fieldValues.push(payload[fields[i]]);
    }
  }
  query = query.slice(0, -1);
  query += ` where id = ${recordId}`;
  db.query(query, fieldValues, function (err, data) {
    if (err) {
      result(err);
    } else {
      db.query(
        `select * from ${tableName} where id = ${recordId}`,
        function (err, updatedData) {
          if (err) {
            result(err);
          } else {
            result(updatedData);
          }
        }
      );
    }
  });
};

OrderIndex.remove = function (id, result) {
  db.query(`delete from ${tableName} where id = ${id}`, function (err, data) {
    if (err) {
      result(null);
    } else result(`Xóa ${tableName} co id: " + id + " thành công`);
  });
};

module.exports = OrderIndex;
