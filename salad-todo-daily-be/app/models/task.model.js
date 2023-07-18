const db = require("../common/connect");
const Task = function (task) {
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
};

const tableName = "task";

Task.getAll = function (userId, result) {
  db.query(
    `select * from ${tableName} where createdBy = ${userId} and isDeleted = 0`,
    function (err, data) {
      if (err) {
        result(null);
      } else {
        result(data);
      }
    }
  );
};

Task.getById = function (userId, recordId, result) {
  db.query(
    `select * from ${tableName} where id = ${recordId} and createdBy = ${userId}`,
    function (err, data) {
      if (err || data.length == 0) {
        result(null);
      } else {
        result(data);
      }
    }
  );
};

Task.create = function (payload, result) {
  db.query(`insert into ${tableName} set ?`, payload, function (err, data) {
    if (err) {
      result(null);
    } else {
      result({ id: data.insertId, ...payload });
    }
  });
};

Task.update = function (payload, result) {
  db.query(
    `update ${tableName} set name = ?, projectId = ?, description = ?, startDate = ?, finishDate = ?, priority = ?, status = ?, duration = ?, checkList = ?, isDeleted = ? where id = ${payload.id}`,
    [
      payload.name,
      payload.projectId,
      payload.description,
      payload.startDate,
      payload.finishDate,
      payload.priority,
      payload.status,
      payload.duration,
      payload.checkList,
      payload.isDeleted,
    ],
    function (err, data) {
      if (err) {
        result(null);
      } else {
        result(data);
      }
    }
  );
};

Task.updateLittle = function (recordId, payload, result) {
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
      result(null);
    } else {
      result(data);
    }
  });
};

Task.remove = function (id, result) {
  db.query(`delete from ${tableName} where id = ${id}`, function (err, data) {
    if (err) {
      result(null);
    } else result(`Xóa ${tableName} co id: " + id + " thành công`);
  });
};

module.exports = Task;
