let isAuth =  async function (req, res, next) {
    var _JWT = require('../common/_JWT');
  var _token = req.headers.authorization;
  if(_token) {
    try {
        var authData = await _JWT.check(_token);
        req.auth = authData;
        next();
    } catch(err) {
        return res.send({status: false, data: "Mã token không hợp lệ"})
    }
  } else {
    return res.send({status: false, data: "Bạn chưa gửi kèm mã token"})
  }
};

module.exports = {
  isAuth: isAuth,
};
