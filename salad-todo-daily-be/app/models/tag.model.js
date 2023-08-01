const db = require("../common/connect");
const Tag = function (tag) {
  this.id = tag.id;
  this.name = tag.name;
  this.color = tag.color;
};

const tableName = "tag";

Tag.getAll = function (userId, result) {
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

Tag.getById = function (userId, recordId, result) {
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

Tag.create = function (payload, result) {
  db.query(`insert into ${tableName} set ?`, payload, function (err, data) {
    if (err) {
      result(null);
    } else {
      result({ id: data.insertId, ...payload });
    }
  });
};

Tag.update = function (recordId, payload, result) {
  db.query(
    `update ${tableName} set name = ?, color = ? where id = ${recordId}`,
    [payload.name, payload.color],
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

Tag.updateLittle = function (recordId, payload, result) {
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

Tag.remove = function (id, result) {
  db.query(`delete from ${tableName} where id = ${id}`, function (err, data) {
    if (err) {
      result(null);
    } else result("Xóa tag co id: " + id + " thành công");
  });
};

module.exports = Tag;
