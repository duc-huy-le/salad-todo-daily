const db = require("../common/connect");
const User = function (user) {
  this.id = user.id;
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
};

User.getAll = function (result) {
  db.query("select * from user", function (err, user) {
    if (err) {
      result(null);
    } else {
      result(user);
    }
  });
};

User.getById = function (id, result) {
  db.query(`select * from user where id = ${id}`, function (err, user) {
    if (err || user.length == 0) {
      result(null);
    } else result(user);
  });
};

User.create = function (data, result) {
  db.query(`insert into user set ?`, data, function (err, user) {
    if (err) {
      result(null);
    } else result({ id: user.insertId, ...data });
  });
  result(data);
};

User.remove = function (id, result) {
  db.query(`delete from user where id = ${id}`, function (err, user) {
    if (err) {
      result(null);
    } else result("Xóa user co id: " + id + " thành công");
  });
};

User.update = function (u, result) {
  db.query(
    `update user set name = ?, image = ?, author_id = ? where id = ${u.id}`,
    [u.name, u.image, u.author_id],
    function (err, user) {
      if (err) {
        result(null);
      } else result(u);
    }
  );
};

User.checkLogin = function (data, result) {
  db.query(
    "select id, name, email from user where email = ? and password = ?",
    [data.email, data.password],
    function (err, user) {
      if (err || user.length == 0) {
        console.error(err);
        result(null);
      } else result(user[0]);
    }
  );
};

module.exports = User;
