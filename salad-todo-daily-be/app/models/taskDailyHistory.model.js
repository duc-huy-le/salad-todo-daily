const db = require("../common/connect");
const TaskDailyHistory = function (taskDailyHistory) {
  this.id = taskDailyHistory.id;
  this.taskDailyId = taskDailyHistory.taskDailyId;
  this.completionDate = taskDailyHistory.completionDate;
  
};

const tableName = "task_daily_history";

TaskDailyHistory.getAll = function (userId, result) {
  const query = `select * from ${tableName}`;
  db.query(
    query,
    function (err, data) {
      if (err) {
        result(err);
      } else {
        result(data);
      }
    }
  );
};


// TaskDailyHistory.getAllToday = function (userId, result) {
//   const query = `select td.*, tdh.taskDailyId IS NOT NULL AS checked FROM ${tableName} td
//   LEFT JOIN task_daily_history tdh ON td.id = tdh.taskDailyId AND DATE(tdh.completionDate) = CURDATE()
//   WHERE td.createdBy = ${userId} AND td.isDeleted = 0;`;
//   db.query(
//     // `select * from ${tableName} where createdBy = ${userId} and isDeleted = 0`,
//     query,
//     function (err, data) {
//       if (err) {
//         result(null);
//       } else {
//         result(data);
//       }
//     }
//   );
// };

// TaskDailyHistory.getById = function (userId, recordId, result) {
//   db.query(
//     `select * from ${tableName} where id = ${recordId} and createdBy = ${userId}`,
//     function (err, data) {
//       if (err || data.length == 0) {
//         result(null);
//       } else {
//         result(data);
//       }
//     }
//   );
// };

TaskDailyHistory.create = function (payload, result) {
  db.query(`insert into ${tableName} set ?`, payload, function (err, data) {
    if (err) {
      result(err);
    } else {
      result({ id: data.insertId, ...payload });
    }
  });
};

// TaskDailyHistory.update = function (payload, result) {
//   db.query(
//     `update ${tableName} set name = ?, projectId = ?, description = ?, startDate = ?, finishDate = ?, priority = ?, status = ?, checkList = ?, isDeleted = ? where id = ${payload.id}`,
//     [
//       payload.name,
//       payload.projectId,
//       payload.description,
//       payload.startDate,
//       payload.finishDate,
//       payload.priority,
//       payload.status,
//       payload.checkList,
//       payload.isDeleted,
//     ],
//     function (err, data) {
//       if (err) {
//         result(null);
//       } else {
//         result(data);
//       }
//     }
//   );
// };

// TaskDailyHistory.updateLittle = function (recordId, payload, result) {
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
//       result(null);
//     } else {
//       result(data);
//     }
//   });
// };

TaskDailyHistory.remove = function (id, result) {
  db.query(`delete from ${tableName} where taskDailyId = ${id} AND DATE(completionDate) = CURDATE();`, function (err, data) {
    if (err) {
      result(err);
    } else result(`Xóa ${tableName} co id: " + id + " thành công`);
  });
};

module.exports = TaskDailyHistory;
