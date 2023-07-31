const db = require("../common/connect");
const TaskDaily = function (taskDaily) {
  this.id = taskDaily.id;
  this.name = taskDaily.name;
  this.description = taskDaily.description;
  this.tagId = taskDaily.tagId;
  this.startDate = taskDaily.startDate;
  this.finishDate = taskDaily.finishDate;
  this.priority = taskDaily.priority;
  this.isDeleted = taskDaily.isDeleted;
  this.createdAt = taskDaily.createdAt;
  this.createdBy = taskDaily.createdBy;
};

const tableName = "task_daily";

TaskDaily.getAll = function (userId, result) {
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
TaskDaily.getAllToday = function (userId, result) {
  const query = `select td.*, tdh.taskDailyId IS NOT NULL AS checked FROM ${tableName} td
  LEFT JOIN task_daily_history tdh ON td.id = tdh.taskDailyId AND DATE(tdh.completionDate) = CURDATE()
  WHERE td.createdBy = ${userId} AND td.isDeleted = 0;`;
  db.query(
    // `select * from ${tableName} where createdBy = ${userId} and isDeleted = 0`,
    query,
    function (err, data) {
      if (err) {
        result(null);
      } else {
        result(data);
      }
    }
  );
};

TaskDaily.getById = function (userId, recordId, result) {
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

TaskDaily.create = function (payload, result) {
  db.query(`insert into ${tableName} set ?`, payload, function (err, data) {
    if (err) {
      result(err);
    } else {
      result({ id: data.insertId, ...payload });
    }
  });
};

TaskDaily.update = function (payload, result) {
  db.query(
    `update ${tableName} set name = ?, projectId = ?, description = ?, startDate = ?, finishDate = ?, priority = ?, status = ?, checkList = ?, isDeleted = ? where id = ${payload.id}`,
    [
      payload.name,
      payload.projectId,
      payload.description,
      payload.startDate,
      payload.finishDate,
      payload.priority,
      payload.status,
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

TaskDaily.updateLittle = function (recordId, payload, result) {
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

TaskDaily.remove = function (id, result) {
  db.query(`delete from ${tableName} where id = ${id}`, function (err, data) {
    if (err) {
      result(null);
    } else result(`Xóa ${tableName} co id: " + id + " thành công`);
  });
};

module.exports = TaskDaily;
