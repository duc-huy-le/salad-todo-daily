const db = require("../common/connect");
const Project = function (project) {
  this.id = project.id;
  this.name = project.name;
  this.description = project.description;
  this.color = project.color;
  this.totalTask = project.totalTask;
  this.completedTask = project.completedTask;
  this.isDeleted = project.isDeleted;
  this.startDate = project.startDate;
  this.createdAt = project.createdAt;
};

const tableName = "project";

Project.getAll = function (userId, result) {
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

Project.getById = function (userId, projectId, result) {
  db.query(
    `select * from ${tableName} where id = ${projectId} and createdBy = ${userId}`,
    function (err, data) {
      if (err || data.length == 0) {
        result(null);
      } else result(data);
    }
  );
};

Project.create = function (payload, result) {
  db.query(`insert into ${tableName} set ?`, payload, function (err, data) {
    if (err) {
      result(null);
    } else result({ id: data.insertId, ...payload });
  });
};

Project.update = function (recordId, payload, result) {
  db.query(
    `update ${tableName} set name = ?, description = ?, color = ?, isDeleted = ?, startDate = ?, createdAt = ? where id = ${recordId}`,
    [
      payload.name,
      payload.description,
      payload.color,
      payload.isDeleted,
      payload.startDate,
      payload.createdAt,
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

Project.updateLittle = function (recordId, payload, result) {
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

Project.remove = function (id, result) {
  db.query(`delete from project where id = ${id}`, function (err, project) {
    if (err) {
      result(null);
    } else result("Xóa user co id: " + id + " thành công");
  });
};

module.exports = Project;
