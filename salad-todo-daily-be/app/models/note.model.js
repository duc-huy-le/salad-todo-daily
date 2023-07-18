const db = require("../common/connect");
const Note = function (note) {
  this.id = note.id;
  this.title = note.title;
  this.content = note.color;
  this.isDeleted = task.isDeleted;
  this.createdAt = task.createdAt;
  this.createdBy = task.createdBy;
};

const tableName = "note";

Note.getAll = function (userId, result) {
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

Note.getById = function (userId, recordId, result) {
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

Note.create = function (payload, result) {
  db.query(`insert into ${tableName} set ?`, payload, function (err, data) {
    if (err) {
      result(null);
    } else {
      result({ id: data.insertId, ...payload });
    }
  });
};

Note.update = function (payload, result) {
  db.query(
    `update ${tableName} set title = ?, content = ?, isDeleted = ? where id = ${payload.id}`,
    [payload.title, payload.content, payload.isDeleted],
    function (err, data) {
      if (err) {
        result(null);
      } else {
        result(data);
      }
    }
  );
};

Note.updateLittle = function (recordId, payload, result) {
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

Note.remove = function (id, result) {
  db.query(`delete from ${tableName} where id = ${id}`, function (err, data) {
    if (err) {
      result(null);
    } else result(`Xóa ${tableName} co id: ${id} thành công`);
  });
};

module.exports = Note;
