const db = require("../common/connect");
const Project = function (project) {
  this.id = project.id;
  this.name = project.name;
  this.description = project.description;
  this.color = project.color;
  this.isDeleted = project.isDeleted;
  this.startDate = project.startDate;
  this.createdAt = project.createdAt;
};

const tableName = "project";

Project.getAll = function (userId, result) {
  db.query(`select * from ${tableName} where createdBy = ${userId}`, function (err, data) {
    if (err) {
      console.log('error: ' + err);
      result(null);
    } else {
      result(data);
    }
  });
};

Project.getById = function (userId, projectId, result) {
  db.query(`select * from ${tableName} where id = ${projectId} and createdBy = ${userId}`, function (err, data) {
    if (err || data.length == 0) {
      result(null);
    } else result(data);
  });
};

Project.create = function (payload, result) {
  db.query(`insert into ${tableName} set ?`, payload, function (err, data) {
    if (err) {
      console.log(err);
      result(null);
    } else result({ id: data.insertId, ...payload });
  });
};

Project.update = function (payload, result) {
  db.query(
    `update project set name = ?, description = ?, color = ?, isDeleted = ?, startDate = ?, createdAt = ? where id = ${payload.id}`,
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
        result(null);
      } else result(data);
    }
  );
};

Project.remove = function (id, result) {
  db.query(`delete from project where id = ${id}`, function (err, project) {
    if (err) {
      result(null);
    } else result("Xóa user co id: " + id + " thành công");
  });
};

module.exports = Project;
